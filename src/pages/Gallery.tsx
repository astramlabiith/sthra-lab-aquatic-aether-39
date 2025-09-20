import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { SEOHead } from '@/components/SEOHead';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface Photo {
  id: string;
  src: string;
  title: string;
  category: 'lab-testing' | 'celebrations' | 'conferences' | 'research' | 'events';
  date: string;
  description: string;
}

// Sample photos data - replace with actual lab photos
const samplePhotos: Photo[] = [
  {
    id: '1',
    src: '/lovable-uploads/da53a3a9-ab22-4174-9236-d4f144f870d6.png',
    title: 'Advanced Lab Testing Setup',
    category: 'lab-testing',
    date: '2024-01-15',
    description: 'Setting up advanced testing equipment for underwater robotics research'
  },
  {
    id: '2',
    src: '/lovable-uploads/5a08d394-1050-4952-86da-cfc45e78f624.png',
    title: 'Annual Lab Celebration',
    category: 'celebrations',
    date: '2024-02-20',
    description: 'Celebrating successful completion of major research milestone'
  },
  {
    id: '3',
    src: '/lovable-uploads/b1227e48-e6b1-463a-b84a-98c328c22760.png',
    title: 'International Robotics Conference',
    category: 'conferences',
    date: '2024-03-10',
    description: 'Presenting our latest research at the International Robotics Conference'
  },
  {
    id: '4',
    src: '/lovable-uploads/987fcbde-e190-4da7-b505-f08d24cdb828.png',
    title: 'Research Team Collaboration',
    category: 'research',
    date: '2024-04-05',
    description: 'Team working on autonomous underwater vehicle navigation systems'
  },
  {
    id: '5',
    src: '/lovable-uploads/acb63335-5d45-4ddc-8556-2002d7e6a226.png',
    title: 'Workshop on Marine Robotics',
    category: 'events',
    date: '2024-05-12',
    description: 'Conducting workshop on marine robotics for undergraduate students'
  },
  {
    id: '6',
    src: '/lovable-uploads/f8ed0830-6867-44a8-b26a-6dbd40b8906e.png',
    title: 'Laboratory Equipment Testing',
    category: 'lab-testing',
    date: '2024-06-08',
    description: 'Testing new underwater sensing equipment in controlled environment'
  }
];

const categoryColors = {
  'lab-testing': 'bg-blue-100 text-blue-800',
  'celebrations': 'bg-green-100 text-green-800',
  'conferences': 'bg-purple-100 text-purple-800',
  'research': 'bg-orange-100 text-orange-800',
  'events': 'bg-pink-100 text-pink-800'
};

const categoryLabels = {
  'lab-testing': 'Lab Testing',
  'celebrations': 'Celebrations',
  'conferences': 'Conferences',
  'research': 'Research',
  'events': 'Events'
};

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const categories = ['all', ...Object.keys(categoryLabels)];
  
  const filteredPhotos = selectedCategory === 'all' 
    ? samplePhotos 
    : samplePhotos.filter(photo => photo.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <SEOHead 
        title="Photo Gallery | AstraM Lab"
        description="Browse photos from AstraM Lab activities including lab testing, celebrations, conferences, research projects, and academic events at IIT Hyderabad."
        keywords="AstraM Lab photos, laboratory testing, academic conferences, research celebrations, IIT Hyderabad events"
      />
      
      <Navigation />
      
      {/* Hero Section */}
      <section className="section-padding bg-white border-b border-gray-200 mt-20">
        <div className="container-width">
          <div className="text-center">
            <h1 className="academic-heading">Photo Gallery</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore moments from our laboratory activities, research milestones, 
              academic conferences, and team celebrations at AstraM Lab.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container-width">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category === 'all' ? 'All Photos' : categoryLabels[category as keyof typeof categoryLabels]}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="section-padding">
        <div className="container-width">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPhotos.map((photo) => (
              <Dialog key={photo.id}>
                <DialogTrigger asChild>
                  <Card className="academic-card cursor-pointer overflow-hidden group">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-3 right-3">
                        <Badge className={categoryColors[photo.category]}>
                          {categoryLabels[photo.category]}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {photo.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {photo.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(photo.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </Card>
                </DialogTrigger>
                
                <DialogContent className="max-w-4xl">
                  <div className="space-y-4">
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-gray-900">
                          {photo.title}
                        </h2>
                        <Badge className={categoryColors[photo.category]}>
                          {categoryLabels[photo.category]}
                        </Badge>
                      </div>
                      <p className="text-gray-600">
                        {photo.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(photo.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
          
          {filteredPhotos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No photos found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gallery;