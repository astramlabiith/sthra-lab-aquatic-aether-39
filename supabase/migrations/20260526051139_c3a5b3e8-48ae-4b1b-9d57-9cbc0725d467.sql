ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS categories text[] NOT NULL DEFAULT '{}';

UPDATE public.projects
SET categories = ARRAY[category::text]
WHERE (categories IS NULL OR array_length(categories, 1) IS NULL);