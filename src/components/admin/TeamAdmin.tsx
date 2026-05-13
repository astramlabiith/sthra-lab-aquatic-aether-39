import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Trash2, Plus, Pencil, X, ImageOff } from 'lucide-react';
import { uploadContentImage } from '@/lib/adminUpload';

const CATEGORIES = [
  { value: 'pi', label: 'Principal Investigator' },
  { value: 'phd', label: 'PhD Students' },
  { value: 'mtech', label: 'M.Tech Students' },
  { value: 'project_staff', label: 'Project Staff' },
  { value: 'intern', label: 'Interns' },
  { value: 'btech', label: 'B.Tech Students' },
  { value: 'alumni', label: 'Alumni' },
];

interface Member {
  id: string; category: string; name: string; role: string | null;
  specialization: string | null; education: string | null; email: string | null; linkedin: string | null;
  image_url: string | null; short_bio: string | null; full_bio: string | null; display_order: number;
}

const blank = {
  category: 'phd', name: '', role: '', specialization: '', education: '',
  email: '', linkedin: '', short_bio: '', full_bio: '', display_order: 0,
};

interface Props { userId: string; }

export const TeamAdmin = ({ userId }: Props) => {
  const [items, setItems] = useState<Member[]>([]);
  const [form, setForm] = useState({ ...blank });
  const [photo, setPhoto] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  const fetchItems = async () => {
    const { data } = await supabase.from('team_members').select('*').order('category').order('display_order');
    if (data) setItems(data as Member[]);
  };
  useEffect(() => { fetchItems(); }, []);

  const resetForm = () => {
    setForm({ ...blank });
    setPhoto(null);
    setEditingId(null);
    setExistingImage(null);
    setRemoveImage(false);
    const el = document.getElementById('member-photo') as HTMLInputElement | null;
    if (el) el.value = '';
  };

  const startEdit = (m: Member) => {
    setEditingId(m.id);
    setForm({
      category: m.category,
      name: m.name,
      role: m.role || '',
      specialization: m.specialization || '',
      education: m.education || '',
      email: m.email || '',
      linkedin: m.linkedin || '',
      short_bio: m.short_bio || '',
      full_bio: m.full_bio || '',
      display_order: m.display_order || 0,
    });
    setExistingImage(m.image_url);
    setRemoveImage(false);
    setPhoto(null);
    const el = document.getElementById('member-photo') as HTMLInputElement | null;
    if (el) el.value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let imageUrl: string | null | undefined = undefined;
      if (photo) imageUrl = await uploadContentImage(photo, userId);
      else if (removeImage) imageUrl = null;

      const payload: any = {
        category: form.category,
        name: form.name,
        role: form.role || null,
        specialization: form.specialization || null,
        education: form.education || null,
        email: form.email || null,
        linkedin: form.linkedin || null,
        short_bio: form.short_bio || null,
        full_bio: form.full_bio || null,
        display_order: Number(form.display_order) || 0,
      };

      if (editingId) {
        if (imageUrl !== undefined) payload.image_url = imageUrl;
        const { error } = await supabase.from('team_members').update(payload).eq('id', editingId);
        if (error) throw error;
        toast({ title: 'Team member updated' });
      } else {
        payload.image_url = imageUrl ?? null;
        const { error } = await supabase.from('team_members').insert(payload);
        if (error) throw error;
        toast({ title: 'Team member added' });
      }
      resetForm();
      fetchItems();
    } catch (err: any) {
      toast({ title: 'Failed', description: err.message, variant: 'destructive' });
    }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this team member?')) return;
    const { error } = await supabase.from('team_members').delete().eq('id', id);
    if (error) toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    else { toast({ title: 'Deleted' }); fetchItems(); if (editingId === id) resetForm(); }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader><CardTitle>{editingId ? 'Edit Team Member' : 'Add Team Member'}</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={form.category} onValueChange={v => setForm({ ...form, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{CATEGORIES.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Name *</Label>
                <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="member-photo">Photo</Label>
              {editingId && existingImage && !removeImage && !photo && (
                <div className="flex items-center gap-3 mb-2">
                  <img src={existingImage} alt="current" className="w-16 h-16 object-cover rounded" />
                  <Button type="button" variant="outline" size="sm" onClick={() => setRemoveImage(true)}>
                    <ImageOff className="h-4 w-4 mr-1" /> Remove image
                  </Button>
                </div>
              )}
              {removeImage && <p className="text-xs text-destructive">Image will be removed on save</p>}
              <Input id="member-photo" type="file" accept="image/*" onChange={e => { setPhoto(e.target.files?.[0] || null); setRemoveImage(false); }} />
              {editingId && <p className="text-xs text-muted-foreground">Leave empty to keep current image.</p>}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Project / Specialization</Label>
                <Input value={form.specialization} onChange={e => setForm({ ...form, specialization: e.target.value })} /></div>
              <div className="space-y-2"><Label>Role (optional)</Label>
                <Input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} /></div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Email</Label>
                <Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
              <div className="space-y-2"><Label>LinkedIn URL</Label>
                <Input value={form.linkedin} onChange={e => setForm({ ...form, linkedin: e.target.value })} /></div>
            </div>
            <div className="space-y-2"><Label>Brief / Short Bio</Label>
              <Textarea value={form.short_bio} onChange={e => setForm({ ...form, short_bio: e.target.value })} rows={3} /></div>
            {form.category === 'pi' && (
              <>
                <div className="space-y-2"><Label>Education</Label>
                  <Input value={form.education} onChange={e => setForm({ ...form, education: e.target.value })} /></div>
                <div className="space-y-2"><Label>Full Bio (PI only)</Label>
                  <Textarea value={form.full_bio} onChange={e => setForm({ ...form, full_bio: e.target.value })} rows={5} /></div>
              </>
            )}
            <div className="space-y-2"><Label>Display Order</Label>
              <Input type="number" value={form.display_order} onChange={e => setForm({ ...form, display_order: Number(e.target.value) })} /></div>
            <div className="flex gap-2">
              <Button type="submit" disabled={saving}>
                <Plus className="h-4 w-4 mr-2" />{saving ? 'Saving...' : editingId ? 'Update Member' : 'Add Member'}
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
            {items.map(m => (
              <div key={m.id} className="flex items-start gap-4 p-3 border rounded-lg">
                {m.image_url && <img src={m.image_url} alt={m.name} className="w-16 h-16 object-cover rounded" />}
                <div className="flex-1">
                  <span className="text-xs uppercase font-semibold text-blue-700">
                    {CATEGORIES.find(c => c.value === m.category)?.label}
                  </span>
                  <h4 className="font-semibold">{m.name}</h4>
                  <p className="text-sm text-muted-foreground">{m.specialization}</p>
                </div>
                <Button variant="outline" size="icon" onClick={() => startEdit(m)}><Pencil className="h-4 w-4" /></Button>
                <Button variant="destructive" size="icon" onClick={() => remove(m.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
