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

interface Publication {
  id: string;
  kind: 'research' | 'conference';
  title: string;
  authors: string;
  venue: string;
  year: string;
  abstract: string | null;
  doi: string | null;
  pdf_link: string | null;
  display_order: number;
}

const blank = {
  kind: 'research' as 'research' | 'conference',
  title: '', authors: '', venue: '', year: '', abstract: '', doi: '', pdf_link: '', display_order: 0,
};

export const PublicationsAdmin = () => {
  const [items, setItems] = useState<Publication[]>([]);
  const [form, setForm] = useState({ ...blank });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    const { data } = await supabase.from('publications').select('*').order('kind').order('display_order');
    if (data) setItems(data as Publication[]);
  };
  useEffect(() => { fetchItems(); }, []);

  const resetForm = () => { setForm({ ...blank }); setEditingId(null); };

  const startEdit = (p: Publication) => {
    setEditingId(p.id);
    setForm({
      kind: p.kind, title: p.title, authors: p.authors, venue: p.venue, year: p.year,
      abstract: p.abstract || '', doi: p.doi || '', pdf_link: p.pdf_link || '',
      display_order: p.display_order,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      abstract: form.abstract || null,
      doi: form.doi || null,
      pdf_link: form.pdf_link || null,
      display_order: Number(form.display_order) || 0,
    };
    const { error } = editingId
      ? await supabase.from('publications').update(payload).eq('id', editingId)
      : await supabase.from('publications').insert(payload);
    if (error) toast({ title: 'Failed', description: error.message, variant: 'destructive' });
    else {
      toast({ title: editingId ? 'Publication updated' : 'Publication added' });
      resetForm();
      fetchItems();
    }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this publication?')) return;
    const { error } = await supabase.from('publications').delete().eq('id', id);
    if (error) toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    else { toast({ title: 'Deleted' }); fetchItems(); if (editingId === id) resetForm(); }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader><CardTitle>{editingId ? 'Edit Publication' : 'Add Publication'}</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type *</Label>
                <Select value={form.kind} onValueChange={(v: any) => setForm({ ...form, kind: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="research">Research Paper</SelectItem>
                    <SelectItem value="conference">Conference Paper</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Year *</Label>
                <Input value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} required />
              </div>
            </div>
            <div className="space-y-2"><Label>Title *</Label>
              <Input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></div>
            <div className="space-y-2"><Label>Authors *</Label>
              <Input value={form.authors} onChange={e => setForm({ ...form, authors: e.target.value })} required /></div>
            <div className="space-y-2"><Label>Venue *</Label>
              <Input value={form.venue} onChange={e => setForm({ ...form, venue: e.target.value })} required /></div>
            <div className="space-y-2"><Label>Abstract / Brief</Label>
              <Textarea value={form.abstract} onChange={e => setForm({ ...form, abstract: e.target.value })} rows={4} /></div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>DOI / Source</Label>
                <Input value={form.doi} onChange={e => setForm({ ...form, doi: e.target.value })} /></div>
              <div className="space-y-2"><Label>PDF / Paper Link</Label>
                <Input value={form.pdf_link} onChange={e => setForm({ ...form, pdf_link: e.target.value })} placeholder="# or https://..." /></div>
            </div>
            <div className="space-y-2"><Label>Display Order</Label>
              <Input type="number" value={form.display_order} onChange={e => setForm({ ...form, display_order: Number(e.target.value) })} /></div>
            <div className="flex gap-2">
              <Button type="submit" disabled={saving}>
                {editingId ? <Pencil className="h-4 w-4 mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                {saving ? 'Saving...' : editingId ? 'Update Publication' : 'Add Publication'}
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
                <div className="flex-1">
                  <span className="text-xs uppercase font-semibold text-blue-700">{p.kind} · {p.year}</span>
                  <h4 className="font-semibold">{p.title}</h4>
                  <p className="text-sm text-muted-foreground">{p.authors}</p>
                  <p className="text-xs text-muted-foreground">{p.venue}</p>
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
