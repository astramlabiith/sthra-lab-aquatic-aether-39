import React, { useEffect, useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { SEOHead } from '../components/SEOHead';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import { AlbumViewer } from '../components/gallery/AlbumViewer';
import { Skeleton } from '@/components/ui/skeleton';

interface Album {
  id: string;
  title: string;
  description: string | null;
  album_date: string | null;
  cover_image_url: string;
  created_at: string;
}

const Gallery = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      const { data, error } = await supabase
        .from('albums')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) setAlbums(data);
      setLoading(false);
    };
    fetchAlbums();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SEOHead
        title="Gallery - AstraM Lab IITH"
        description="Explore photos and moments from AstraM Lab at IIT Hyderabad — research events, lab activities, and team highlights."
        keywords="astram lab gallery, iith gallery, lab photos, research events"
        canonical="/gallery"
      />
      <Navigation />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Gallery
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Moments, milestones, and memories from the AstraM Lab.
            </p>
          </header>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-72 w-full rounded-xl" />
              ))}
            </div>
          ) : albums.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No albums yet. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.map((album) => (
                <button
                  key={album.id}
                  onClick={() => setSelectedAlbum(album)}
                  className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 bg-white text-left"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={album.cover_image_url}
                      alt={album.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="text-xl font-bold mb-1">{album.title}</h3>
                    {album.album_date && (
                      <p className="text-sm text-white/80">
                        {format(new Date(album.album_date), 'MMMM d, yyyy')}
                      </p>
                    )}
                    {album.description && (
                      <p className="text-sm text-white/90 mt-1 line-clamp-2">
                        {album.description}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>

      {selectedAlbum && (
        <AlbumViewer
          album={selectedAlbum}
          onClose={() => setSelectedAlbum(null)}
        />
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
