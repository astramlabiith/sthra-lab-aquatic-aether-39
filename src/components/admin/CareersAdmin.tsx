import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { Trash2, Plus } from 'lucide-react';

interface Career {
  id: string; kind: 'Internship' | 'Hiring'; title: string;
  description: string | null; requirements: string[];
  apply_link: string | null; apply_email: string | null;
  is_open: boolean; display_order: number;
}

const blank = {
  kind: 'Internship' as 'Internship' | 'Hiring',
  title: '', description: '', requirements: '',
  apply_link: '', apply_email: '', is_open: true, display_order: 0,
};

export const CareersAdmin = () => {
  const [items, setItems] = useState<Career[]>([]);
  const [form, setForm] = useState({ ...blank });
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    const { data } = await supabase.from('careers').select('*').order('kind').order('display_order');
    if (data) setItems(data as Career[]);
  };
  useEffect(() => { fetchItems(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from('careers').insert({
      kind: form.kind, title: form.title,
      description: form.description || null,
      requirements: form.requirements.split('\n').map(s => s.trim()).filter(Boolean),
      apply_link: form.apply_link || null,
      apply_email: form.apply_email || null,
      is_open: form.is_open,
      display_order: Number(form.display_order) || 0,
    });
    if (error) toast({ title: 'Failed', description: error.message, variant: 'destructive' });
    else { toast({ title: 'Posting added' }); setForm({ ...blank }); fetchItems(); }
    setSaving(false);
  };

  const toggleOpen = async (c: Career) => {
    await supabase.from('careers').update({ is_open: !c.is_open }).eq('id', c.id);
    fetchItems();
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this posting?')) return;
    const { error } = await supabase.from('careers').delete().eq('id', id);
    if (error) toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    else { toast({ title: 'Deleted' }); fetchItems(); }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader><CardTitle>Add Career / Internship Posting</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type *</Label>
                <Select value={form.kind} onValueChange={(v: any) => setForm({ ...form, kind: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Hiring">Hiring</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Display Order</Label>
                <Input type="number" value={form.display_order} onChange={e => setForm({ ...form, display_order: Number(e.target.value) })} />
              </div>
            </div>
            <div className="space-y-2"><Label>Title *</Label>
              <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></div>
            <div className="space-y-2"><Label>Description</Label>
              <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} /></div>
            <div className="space-y-2"><Label>Requirements (one per line)</Label>
              <Textarea value={form.requirements} onChange={e => setForm({ ...form, requirements: e.target.value })} rows={4} /></div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Apply Link</Label>
                <Input value={form.apply_link} onChange={e => setForm({ ...form, apply_link: e.target.value })} placeholder="https://..." /></div>
              <div className="space-y-2"><Label>Apply Email</Label>
                <Input value={form.apply_email} onChange={e => setForm({ ...form, apply_email: e.target.value })} placeholder="email@..." /></div>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.is_open} onCheckedChange={(v) => setForm({ ...form, is_open: v })} />
              <Label>Open for applications</Label>
            </div>
            <Button type="submit" disabled={saving}><Plus className="h-4 w-4 mr-2" />{saving ? 'Saving...' : 'Add Posting'}</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Existing ({items.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {items.map(c => (
              <div key={c.id} className="flex items-start gap-4 p-3 border rounded-lg">
                <div className="flex-1">
                  <span className="text-xs uppercase font-semibold text-blue-700">{c.kind} {c.is_open ? '· Open' : '· Closed'}</span>
                  <h4 className="font-semibold">{c.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">{c.description}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => toggleOpen(c)}>{c.is_open ? 'Close' : 'Reopen'}</Button>
                <Button variant="destructive" size="icon" onClick={() => remove(c.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
