import React from 'react';
import { Heart, X, BedDouble, Bath, Square, MapPin, DollarSign } from 'lucide-react';
import { Apartment } from '../types';
import { useSwipe } from '../hooks/useSwipe';

interface Props {
  apartment: Apartment;
  onLike: () => void;
  onDislike: () => void;
}

export function ApartmentCard({ apartment, onLike, onDislike }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const { style, bindDragEvents, isDragging, direction, offset } = useSwipe({
    onSwipeLeft: onDislike,
    onSwipeRight: onLike,
  });

  const nextImage = (e: React.MouseEvent) => {
    if (isDragging) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    if (x > rect.width / 2) {
      setCurrentImageIndex((prev) => 
        prev === apartment.images.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentImageIndex((prev) => 
        prev === 0 ? apartment.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div 
      ref={cardRef}
      className="relative w-full max-w-md h-[600px] bg-white rounded-2xl shadow-xl overflow-hidden"
      style={style}
      {...bindDragEvents}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center cursor-pointer"
        style={{ backgroundImage: `url(${apartment.images[currentImageIndex]})` }}
        onClick={nextImage}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
      </div>

      {/* Swipe Indicators */}
      <div 
        className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none"
        style={{ opacity: Math.min(offset / 100, 1) }}
      >
        <div className={`rounded-full bg-white/90 p-4 ${direction === 'left' ? 'opacity-100' : 'opacity-0'}`}>
          <X className="w-8 h-8 text-red-500" />
        </div>
        <div className={`rounded-full bg-white/90 p-4 ${direction === 'right' ? 'opacity-100' : 'opacity-0'}`}>
          <Heart className="w-8 h-8 text-green-500" />
        </div>
      </div>

      <div className="absolute bottom-0 w-full p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{apartment.title}</h2>
        
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-4 h-4" />
          <span>{apartment.location}</span>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            <span>{apartment.price}/mo</span>
          </div>
          <div className="flex items-center gap-1">
            <BedDouble className="w-4 h-4" />
            <span>{apartment.beds}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-4 h-4" />
            <span>{apartment.baths}</span>
          </div>
          <div className="flex items-center gap-1">
            <Square className="w-4 h-4" />
            <span>{apartment.sqft} sqft</span>
          </div>
        </div>

        <p className="text-sm opacity-90 mb-4">{apartment.description}</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onDislike}
            className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            <X className="w-8 h-8 text-red-500" />
          </button>
          <button
            onClick={onLike}
            className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          >
            <Heart className="w-8 h-8 text-green-500" />
          </button>
        </div>
      </div>

      <div className="absolute top-4 right-4 flex gap-1">
        {apartment.images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}