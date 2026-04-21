import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Album {
  id: string;
  title: string;
  description: string | null;
  album_date: string | null;
  cover_image_url: string;
}

interface AlbumImage {
  id: string;
  image_url: string;
}

interface Props {
  album: Album;
  onClose: () => void;
}

export const AlbumViewer: React.FC<Props> = ({ album, onClose }) => {
  const [images, setImages] = useState<AlbumImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase
        .from('album_images')
        .select('id, image_url')
        .eq('album_id', album.id)
        .order('display_order', { ascending: true });

      if (!error && data) setImages(data);
      setLoading(false);
    };
    fetchImages();
  }, [album.id]);

  return (
    <>
      <Dialog open onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] overflow-y-auto p-0">
          <div className="p-6 border-b sticky top-0 bg-background z-10">
            <DialogTitle className="text-2xl font-bold">{album.title}</DialogTitle>
            <DialogDescription className="mt-1">
              {album.album_date && (
                <span className="text-sm text-muted-foreground mr-2">
                  {format(new Date(album.album_date), 'MMMM d, yyyy')}
                </span>
              )}
              {album.description && <span>{album.description}</span>}
            </DialogDescription>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="columns-2 md:columns-3 gap-4 space-y-4">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-48 w-full rounded-lg" />
                ))}
              </div>
            ) : images.length === 0 ? (
              <p className="text-center text-muted-foreground py-12">
                No images in this album yet.
              </p>
            ) : (
              <div className="columns-2 md:columns-3 gap-4 space-y-4">
                {images.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setPreviewImage(img.image_url)}
                    className="block w-full break-inside-avoid mb-4 overflow-hidden rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <img
                      src={img.image_url}
                      alt=""
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {previewImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <button
            onClick={() => setPreviewImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            aria-label="Close preview"
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={previewImage}
            alt=""
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};
