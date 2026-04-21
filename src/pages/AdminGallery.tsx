import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Trash2, Upload, LogOut } from 'lucide-react';
import { format } from 'date-fns';

interface Album {
  id: string;
  title: string;
  album_date: string | null;
  cover_image_url: string;
  created_at: string;
}

const AdminGallery = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [albumDate, setAlbumDate] = useState('');
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate('/admin');
      else setUserId(session.user.id);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/admin');
      else setUserId(session.user.id);
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchAlbums = async () => {
    const { data } = await supabase
      .from('albums')
      .select('id, title, album_date, cover_image_url, created_at')
      .order('created_at', { ascending: false });
    if (data) setAlbums(data);
  };

  useEffect(() => {
    if (userId) fetchAlbums();
  }, [userId]);

  const uploadFile = async (file: File): Promise<string> => {
    const ext = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from('gallery').upload(fileName, file);
    if (error) throw error;
    const { data } = supabase.storage.from('gallery').getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !coverFile || !imageFiles || imageFiles.length === 0) {
      toast({ title: 'Missing fields', description: 'Cover image and at least one image required.', variant: 'destructive' });
      return;
    }
    setUploading(true);
    try {
      const coverUrl = await uploadFile(coverFile);

      const { data: album, error: albumError } = await supabase
        .from('albums')
        .insert({
          title,
          description: description || null,
          album_date: albumDate || null,
          cover_image_url: coverUrl,
          created_by: userId,
        })
        .select()
        .single();

      if (albumError || !album) throw albumError;

      const imageUrls = await Promise.all(
        Array.from(imageFiles).map((f) => uploadFile(f))
      );
      const rows = imageUrls.map((url, i) => ({
        album_id: album.id,
        image_url: url,
        display_order: i,
      }));
      const { error: imgError } = await supabase.from('album_images').insert(rows);
      if (imgError) throw imgError;

      toast({ title: 'Album created', description: `"${title}" published successfully.` });
      setTitle('');
      setDescription('');
      setAlbumDate('');
      setCoverFile(null);
      setImageFiles(null);
      (document.getElementById('cover-input') as HTMLInputElement).value = '';
      (document.getElementById('images-input') as HTMLInputElement).value = '';
      fetchAlbums();
    } catch (err: any) {
      toast({ title: 'Upload failed', description: err.message, variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const deleteAlbum = async (id: string) => {
    if (!confirm('Delete this album and all its images?')) return;
    const { error } = await supabase.from('albums').delete().eq('id', id);
    if (error) {
      toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Album deleted' });
      fetchAlbums();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navigation />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Gallery Admin</h1>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>

          <Card className="mb-10">
            <CardHeader>
              <CardTitle>Create New Album</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="desc">Description</Label>
                  <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" value={albumDate} onChange={(e) => setAlbumDate(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cover-input">Cover Image *</Label>
                  <Input
                    id="cover-input"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="images-input">Album Images * (select multiple)</Label>
                  <Input
                    id="images-input"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setImageFiles(e.target.files)}
                    required
                  />
                  {imageFiles && (
                    <p className="text-sm text-muted-foreground">{imageFiles.length} image(s) selected</p>
                  )}
                </div>
                <Button type="submit" disabled={uploading} className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  {uploading ? 'Uploading...' : 'Create Album'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Existing Albums ({albums.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {albums.length === 0 ? (
                <p className="text-muted-foreground">No albums yet.</p>
              ) : (
                <div className="space-y-3">
                  {albums.map((a) => (
                    <div key={a.id} className="flex items-center gap-4 p-3 border rounded-lg">
                      <img src={a.cover_image_url} alt={a.title} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-semibold">{a.title}</h3>
                        {a.album_date && (
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(a.album_date), 'MMM d, yyyy')}
                          </p>
                        )}
                      </div>
                      <Button variant="destructive" size="icon" onClick={() => deleteAlbum(a.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminGallery;
