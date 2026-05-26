import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Trash2, Plus, Pencil, X } from 'lucide-react';
import { uploadContentImage } from '@/lib/adminUpload';

const CATEGORIES = ['UAVs', 'AUVs', 'ROVs', 'USVs', 'GNSS', 'Mars Rovers'] as const;
type Cat = typeof CATEGORIES[number];

interface Project {
  id: string; category: Cat; categories: Cat[]; title: string; image_url: string | null;
  description: string | null; progress: number; publications: string[];
  link: string | null; display_order: number;
}

const blank = {
  category: 'UAVs' as Cat, categories: ['UAVs'] as Cat[], title: '', description: '',
  progress: 0, publications: '', link: '', display_order: 0,
};

interface Props { userId: string; }

export const ProjectsAdmin = ({ userId }: Props) => {
  const [items, setItems] = useState<Project[]>([]);
  const [form, setForm] = useState({ ...blank });
  const [photo, setPhoto] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingImage, setEditingImage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    const { data } = await supabase.from('projects').select('*').order('category').order('display_order');
    if (data) setItems(data as Project[]);
  };
  useEffect(() => { fetchItems(); }, []);

  const resetForm = () => {
    setForm({ ...blank }); setPhoto(null); setEditingId(null); setEditingImage(null);
  };

  const startEdit = (p: Project) => {
    setEditingId(p.id);
    setEditingImage(p.image_url);
    setPhoto(null);
    setForm({
      category: p.category,
      categories: (p.categories && p.categories.length ? p.categories : [p.category]) as Cat[],
      title: p.title, description: p.description || '',
      progress: p.progress, publications: p.publications.join(', '),
      link: p.link || '', display_order: p.display_order,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleCategory = (c: Cat) => {
    setForm(f => {
      const has = f.categories.includes(c);
      const next = has ? f.categories.filter(x => x !== c) : [...f.categories, c];
      const safe = next.length ? next : [c];
      return { ...f, categories: safe, category: safe[0] };
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let imageUrl: string | null = editingImage;
      if (photo) imageUrl = await uploadContentImage(photo, userId);
      const payload = {
        category: form.category,
        title: form.title,
        description: form.description || null,
        progress: Number(form.progress) || 0,
        publications: form.publications.split(',').map(s => s.trim()).filter(Boolean),
        link: form.link || null,
        image_url: imageUrl,
        display_order: Number(form.display_order) || 0,
      };
      const { error } = editingId
        ? await supabase.from('projects').update(payload).eq('id', editingId)
        : await supabase.from('projects').insert(payload);
      if (error) throw error;
      toast({ title: editingId ? 'Project updated' : 'Project added' });
      resetForm();
      fetchItems();
    } catch (err: any) {
      toast({ title: 'Failed', description: err.message, variant: 'destructive' });
    } finally { setSaving(false); }
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    else { toast({ title: 'Deleted' }); fetchItems(); if (editingId === id) resetForm(); }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader><CardTitle>{editingId ? 'Edit Project' : 'Add Project'}</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={form.category} onValueChange={(v: Cat) => setForm({ ...form, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              </div>
            </div>
            <div className="space-y-2"><Label>Description</Label>
              <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={4} /></div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Progress (%)</Label>
                <Input type="number" min={0} max={100} value={form.progress}
                  onChange={e => setForm({ ...form, progress: Number(e.target.value) })} /></div>
              <div className="space-y-2"><Label>Display Order</Label>
                <Input type="number" value={form.display_order}
                  onChange={e => setForm({ ...form, display_order: Number(e.target.value) })} /></div>
            </div>
            <div className="space-y-2"><Label>Related Publications (comma separated)</Label>
              <Input value={form.publications} onChange={e => setForm({ ...form, publications: e.target.value })} placeholder="ICRA 2024, IEEE ..." /></div>
            <div className="space-y-2"><Label>Learn More Link (optional)</Label>
              <Input value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} placeholder="https://..." /></div>
            <div className="space-y-2">
              <Label>Image {editingId && '(leave empty to keep current)'}</Label>
              {editingImage && !photo && (
                <div className="flex items-center gap-3 mb-2">
                  <img src={editingImage} alt="current" className="w-32 h-32 object-cover rounded" />
                  <Button type="button" variant="destructive" size="sm" onClick={() => setEditingImage(null)}>
                    <Trash2 className="h-4 w-4 mr-2" />Remove image
                  </Button>
                </div>
              )}
              {photo && (
                <div className="flex items-center gap-3 mb-2 text-sm text-muted-foreground">
                  <span>New: {photo.name}</span>
                  <Button type="button" variant="outline" size="sm" onClick={() => setPhoto(null)}>
                    <X className="h-4 w-4 mr-1" />Clear
                  </Button>
                </div>
              )}
              <Input type="file" accept="image/*" onChange={e => setPhoto(e.target.files?.[0] || null)} />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={saving}>
                {editingId ? <Pencil className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                {saving ? 'Saving...' : editingId ? 'Update Project' : 'Add Project'}
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  <X className="h-4 w-4 mr-2" />Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Existing ({items.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {items.map(p => (
              <div key={p.id} className={`flex items-start gap-4 p-3 border rounded-lg ${editingId === p.id ? 'border-blue-500 bg-blue-50/50' : ''}`}>
                {p.image_url && <img src={p.image_url} className="w-20 h-20 object-cover rounded" alt="" />}
                <div className="flex-1">
                  <span className="text-xs uppercase font-semibold text-blue-700">{p.category} · {p.progress}%</span>
                  <h4 className="font-semibold">{p.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                </div>
                <Button variant="outline" size="icon" onClick={() => startEdit(p)}><Pencil className="h-4 w-4" /></Button>
                <Button variant="destructive" size="icon" onClick={() => remove(p.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
