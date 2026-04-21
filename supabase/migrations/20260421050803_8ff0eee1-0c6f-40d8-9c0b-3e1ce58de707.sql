
-- Albums table
CREATE TABLE public.albums (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  album_date DATE,
  cover_image_url TEXT NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.albums ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view albums"
ON public.albums FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert albums"
ON public.albums FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Authenticated users can update their albums"
ON public.albums FOR UPDATE
TO authenticated
USING (auth.uid() = created_by);

CREATE POLICY "Authenticated users can delete their albums"
ON public.albums FOR DELETE
TO authenticated
USING (auth.uid() = created_by);

-- Album images table
CREATE TABLE public.album_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  album_id UUID NOT NULL REFERENCES public.albums(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.album_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view album images"
ON public.album_images FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can insert album images"
ON public.album_images FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.albums
    WHERE albums.id = album_images.album_id
    AND albums.created_by = auth.uid()
  )
);

CREATE POLICY "Authenticated users can update album images"
ON public.album_images FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.albums
    WHERE albums.id = album_images.album_id
    AND albums.created_by = auth.uid()
  )
);

CREATE POLICY "Authenticated users can delete album images"
ON public.album_images FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.albums
    WHERE albums.id = album_images.album_id
    AND albums.created_by = auth.uid()
  )
);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_albums_updated_at
BEFORE UPDATE ON public.albums
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public)
VALUES ('gallery', 'gallery', true);

-- Storage policies
CREATE POLICY "Anyone can view gallery images"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery');

CREATE POLICY "Authenticated users can upload gallery images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'gallery');

CREATE POLICY "Authenticated users can update gallery images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'gallery');

CREATE POLICY "Authenticated users can delete gallery images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'gallery');

-- Index for performance
CREATE INDEX idx_album_images_album_id ON public.album_images(album_id);
CREATE INDEX idx_albums_created_at ON public.albums(created_at DESC);
