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

interface Course { id: string; kind: 'current' | 'upcoming'; title: string; semester: string | null; instructor: string | null; description: string | null; display_order: number; }
interface Grant { id: string; title: string; grant_type: string | null; duration: string | null; institution: string | null; description: string | null; display_order: number; }

const cBlank = { kind: 'current' as 'current'|'upcoming', title: '', semester: '', instructor: '', description: '', display_order: 0 };
const gBlank = { title: '', grant_type: '', duration: '', institution: '', description: '', display_order: 0 };

export const CoursesAdmin = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [grants, setGrants] = useState<Grant[]>([]);
  const [cForm, setCForm] = useState({ ...cBlank });
  const [gForm, setGForm] = useState({ ...gBlank });

  const fetchAll = async () => {
    const [c, g] = await Promise.all([
      supabase.from('courses').select('*').order('kind').order('display_order'),
      supabase.from('research_grants').select('*').order('display_order'),
    ]);
    if (c.data) setCourses(c.data as Course[]);
    if (g.data) setGrants(g.data as Grant[]);
  };
  useEffect(() => { fetchAll(); }, []);

  const addCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('courses').insert({ ...cForm, display_order: Number(cForm.display_order) || 0 });
    if (error) toast({ title: 'Failed', description: error.message, variant: 'destructive' });
    else { toast({ title: 'Course added' }); setCForm({ ...cBlank }); fetchAll(); }
  };
  const addGrant = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('research_grants').insert({ ...gForm, display_order: Number(gForm.display_order) || 0 });
    if (error) toast({ title: 'Failed', description: error.message, variant: 'destructive' });
    else { toast({ title: 'Grant added' }); setGForm({ ...gBlank }); fetchAll(); }
  };
  const delCourse = async (id: string) => {
    if (!confirm('Delete?')) return;
    await supabase.from('courses').delete().eq('id', id); fetchAll();
  };
  const delGrant = async (id: string) => {
    if (!confirm('Delete?')) return;
    await supabase.from('research_grants').delete().eq('id', id); fetchAll();
  };

  return (
    <div className="space-y-10">
      <Card>
        <CardHeader><CardTitle>Add Course</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={addCourse} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Type *</Label>
                <Select value={cForm.kind} onValueChange={(v: any) => setCForm({ ...cForm, kind: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current">Current</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Semester</Label>
                <Input value={cForm.semester} onChange={e => setCForm({ ...cForm, semester: e.target.value })} /></div>
            </div>
            <div className="space-y-2"><Label>Title *</Label>
              <Input value={cForm.title} onChange={e => setCForm({ ...cForm, title: e.target.value })} required /></div>
            <div className="space-y-2"><Label>Instructor</Label>
              <Input value={cForm.instructor} onChange={e => setCForm({ ...cForm, instructor: e.target.value })} /></div>
            <div className="space-y-2"><Label>Description</Label>
              <Textarea value={cForm.description} onChange={e => setCForm({ ...cForm, description: e.target.value })} rows={3} /></div>
            <div className="space-y-2"><Label>Display Order</Label>
              <Input type="number" value={cForm.display_order} onChange={e => setCForm({ ...cForm, display_order: Number(e.target.value) })} /></div>
            <Button type="submit"><Plus className="h-4 w-4 mr-2" />Add Course</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Existing Courses ({courses.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {courses.map(c => (
              <div key={c.id} className="flex items-start gap-4 p-3 border rounded-lg">
                <div className="flex-1">
                  <span className="text-xs uppercase font-semibold text-blue-700">{c.kind}</span>
                  <h4 className="font-semibold">{c.title}</h4>
                  <p className="text-sm text-muted-foreground">{c.semester}</p>
                </div>
                <Button variant="destructive" size="icon" onClick={() => delCourse(c.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Add Research Grant</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={addGrant} className="space-y-4">
            <div className="space-y-2"><Label>Title *</Label>
              <Input value={gForm.title} onChange={e => setGForm({ ...gForm, title: e.target.value })} required /></div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2"><Label>Type</Label>
                <Input value={gForm.grant_type} onChange={e => setGForm({ ...gForm, grant_type: e.target.value })} /></div>
              <div className="space-y-2"><Label>Duration</Label>
                <Input value={gForm.duration} onChange={e => setGForm({ ...gForm, duration: e.target.value })} /></div>
              <div className="space-y-2"><Label>Institution</Label>
                <Input value={gForm.institution} onChange={e => setGForm({ ...gForm, institution: e.target.value })} /></div>
            </div>
            <div className="space-y-2"><Label>Description</Label>
              <Textarea value={gForm.description} onChange={e => setGForm({ ...gForm, description: e.target.value })} rows={3} /></div>
            <div className="space-y-2"><Label>Display Order</Label>
              <Input type="number" value={gForm.display_order} onChange={e => setGForm({ ...gForm, display_order: Number(e.target.value) })} /></div>
            <Button type="submit"><Plus className="h-4 w-4 mr-2" />Add Grant</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Existing Grants ({grants.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {grants.map(g => (
              <div key={g.id} className="flex items-start gap-4 p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold">{g.title}</h4>
                  <p className="text-sm text-muted-foreground">{g.grant_type} · {g.duration}</p>
                </div>
                <Button variant="destructive" size="icon" onClick={() => delGrant(g.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
