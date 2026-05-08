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

const ICONS = ['Trophy', 'Medal', 'Award', 'Star', 'GraduationCap'];

interface Award {
  id: string; kind: 'pi' | 'lab'; year: string; award: string; recipient: string;
  organization: string | null; description: string | null; icon: string; display_order: number;
}

const blank = {
  kind: 'lab' as 'pi' | 'lab', year: '', award: '', recipient: '',
  organization: '', description: '', icon: 'Trophy', display_order: 0,
};

export const AwardsAdmin = () => {
  const [items, setItems] = useState<Award[]>([]);
  const [form, setForm] = useState({ ...blank });
  const [saving, setSaving] = useState(false);

  const fetchItems = async () => {
    const { data } = await supabase.from('awards').select('*').order('kind').order('display_order');
    if (data) setItems(data as Award[]);
  };
  useEffect(() => { fetchItems(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from('awards').insert({ ...form, display_order: Number(form.display_order) || 0 });
    if (error) toast({ title: 'Failed', description: error.message, variant: 'destructive' });
    else { toast({ title: 'Award added' }); setForm({ ...blank }); fetchItems(); }
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this award?')) return;
    const { error } = await supabase.from('awards').delete().eq('id', id);
    if (error) toast({ title: 'Delete failed', description: error.message, variant: 'destructive' });
    else { toast({ title: 'Deleted' }); fetchItems(); }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader><CardTitle>Add Award</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select value={form.kind} onValueChange={(v: any) => setForm({ ...form, kind: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pi">Principal Investigator</SelectItem>
                    <SelectItem value="lab">Lab Awards & Recognitions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Year *</Label>
                <Input value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} required /></div>
              <div className="space-y-2">
                <Label>Icon</Label>
                <Select value={form.icon} onValueChange={v => setForm({ ...form, icon: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{ICONS.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2"><Label>Award Title *</Label>
              <Input value={form.award} onChange={e => setForm({ ...form, award: e.target.value })} required /></div>
            <div className="space-y-2"><Label>Recipient(s) *</Label>
              <Input value={form.recipient} onChange={e => setForm({ ...form, recipient: e.target.value })} required /></div>
            <div className="space-y-2"><Label>Organization</Label>
              <Input value={form.organization} onChange={e => setForm({ ...form, organization: e.target.value })} /></div>
            <div className="space-y-2"><Label>Description</Label>
              <Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} /></div>
            <div className="space-y-2"><Label>Display Order</Label>
              <Input type="number" value={form.display_order} onChange={e => setForm({ ...form, display_order: Number(e.target.value) })} /></div>
            <Button type="submit" disabled={saving}><Plus className="h-4 w-4 mr-2" />{saving ? 'Saving...' : 'Add Award'}</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Existing ({items.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {items.map(a => (
              <div key={a.id} className="flex items-start gap-4 p-3 border rounded-lg">
                <div className="flex-1">
                  <span className="text-xs uppercase font-semibold text-blue-700">{a.kind === 'pi' ? 'PI' : 'Lab'} · {a.year}</span>
                  <h4 className="font-semibold">{a.award}</h4>
                  <p className="text-sm text-muted-foreground">{a.recipient}</p>
                  <p className="text-xs text-muted-foreground">{a.organization}</p>
                </div>
                <Button variant="destructive" size="icon" onClick={() => remove(a.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
