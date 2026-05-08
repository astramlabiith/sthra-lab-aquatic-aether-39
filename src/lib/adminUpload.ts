import { supabase } from '@/integrations/supabase/client';

export async function uploadContentImage(file: File, userId: string): Promise<string> {
  const ext = file.name.split('.').pop();
  const fileName = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from('content').upload(fileName, file);
  if (error) throw error;
  const { data } = supabase.storage.from('content').getPublicUrl(fileName);
  return data.publicUrl;
}
