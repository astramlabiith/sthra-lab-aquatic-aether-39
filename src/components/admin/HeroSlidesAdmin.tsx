import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Trash2, Plus } from 'lucide-react';
import { uploadContentImage } from '@/lib/adminUpload';

interface Slide {
  id: string; image_url: string; caption: string | null; display_order: number;
}

interface Props { userId: string; }

export const HeroSlidesAdmin = ({ userId }: Props) => {
  const [items, setItems] = useState<Slide[]>([]);
  const [photo, setPhoto] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const [order, setOrder] = useState(0);
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    const { data } = await supabase.from('hero_slides').select('*').order('display_order');
    if (data) setItems(data as Slide[]);
  };
  useEffect(() => { fetchItems(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo) { toast({ title: 'Please select an image', variant: 'destructive' }); return; }
    setSaving(true);
    try {
      const url = await uploadContentImage(photo, userId);
      const { error } = await supabase.from('hero_slides').insert({
        image_url: url, caption: caption || null, display_order: Number(order) || 0,
      });
      if (error) throw error;
      toast({ title: 'Slide added' });
      setPhoto(null); setCaption(''); setOrder(0);
      fetchItems();
    } catch (err: any) {
      toast({ title: 'Failed', description: err.message, variant: 'destructive' });
    } finally { setSaving(false); }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this slide?')) return;
    const { error } = await supabase.from('hero_slides').delete().eq('id', id);
    if (error) toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    else { toast({ title: 'Deleted' }); fetchItems(); }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader><CardTitle>Add Hero Slide</CardTitle>
          <p className="text-sm text-muted-foreground">Images rotate as the home page background.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2"><Label>Image *</Label>
              <Input type="file" accept="image/*" onChange={e => setPhoto(e.target.files?.[0] || null)} required /></div>
            <div className="space-y-2"><Label>Caption (optional)</Label>
              <Input value={caption} onChange={e => setCaption(e.target.value)} /></div>
            <div className="space-y-2"><Label>Display Order</Label>
              <Input type="number" value={order} onChange={e => setOrder(Number(e.target.value))} /></div>
            <Button type="submit" disabled={saving}><Plus className="h-4 w-4 mr-2" />{saving ? 'Uploading...' : 'Add Slide'}</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Existing ({items.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {items.map(s => (
              <div key={s.id} className="flex items-start gap-3 p-3 border rounded-lg">
                <img src={s.image_url} className="w-32 h-20 object-cover rounded" alt="" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Order: {s.display_order}</p>
                  {s.caption && <p className="text-sm">{s.caption}</p>}
                </div>
                <Button variant="destructive" size="icon" onClick={() => remove(s.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
