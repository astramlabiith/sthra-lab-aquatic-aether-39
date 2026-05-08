import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Trash2, Plus } from 'lucide-react';
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
  specialization: string | null; email: string | null; linkedin: string | null;
  image_url: string | null; short_bio: string | null; display_order: number;
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

  const fetchItems = async () => {
    const { data } = await supabase.from('team_members').select('*').order('category').order('display_order');
    if (data) setItems(data as Member[]);
  };
  useEffect(() => { fetchItems(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let imageUrl: string | null = null;
      if (photo) imageUrl = await uploadContentImage(photo, userId);
      const { error } = await supabase.from('team_members').insert({
        ...form,
        image_url: imageUrl,
        display_order: Number(form.display_order) || 0,
        role: form.role || null,
        education: form.education || null,
        full_bio: form.full_bio || null,
      } as any);
      if (error) throw error;
      toast({ title: 'Team member added' });
      setForm({ ...blank });
      setPhoto(null);
      (document.getElementById('member-photo') as HTMLInputElement).value = '';
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
    else { toast({ title: 'Deleted' }); fetchItems(); }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader><CardTitle>Add Team Member</CardTitle></CardHeader>
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
            <div className="space-y-2"><Label htmlFor="member-photo">Photo</Label>
              <Input id="member-photo" type="file" accept="image/*" onChange={e => setPhoto(e.target.files?.[0] || null)} /></div>
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
            <Button type="submit" disabled={saving}><Plus className="h-4 w-4 mr-2" />{saving ? 'Saving...' : 'Add Member'}</Button>
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
                <Button variant="destructive" size="icon" onClick={() => remove(m.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
