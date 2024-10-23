import React from 'react';
import { Building, Heart } from 'lucide-react';
import { ApartmentCard } from './components/ApartmentCard';
import { apartments } from './data/apartments';
import { Apartment } from './types';

function App() {
  const [currentApartments, setCurrentApartments] = React.useState<Apartment[]>(apartments);
  const [likedApartments, setLikedApartments] = React.useState<Apartment[]>([]);

  const handleLike = () => {
    if (currentApartments.length > 0) {
      const [current, ...rest] = currentApartments;
      setLikedApartments([...likedApartments, current]);
      setCurrentApartments(rest);
    }
  };

  const handleDislike = () => {
    if (currentApartments.length > 0) {
      const [_, ...rest] = currentApartments;
      setCurrentApartments(rest);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <header className="p-4 flex items-center justify-center border-b bg-white/50 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <Building className="w-6 h-6 text-purple-600" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
            PadSwipe
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-8">
          {currentApartments.length > 0 ? (
            <ApartmentCard
              apartment={currentApartments[0]}
              onLike={handleLike}
              onDislike={handleDislike}
            />
          ) : (
            <div className="text-center p-8">
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                No more apartments to show!
              </h2>
              <p className="text-gray-500">
                You've liked {likedApartments.length} apartments.
              </p>
            </div>
          )}

          {likedApartments.length > 0 && (
            <div className="w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Liked Apartments</h3>
              <div className="space-y-4">
                {likedApartments.map((apt) => (
                  <div
                    key={apt.id}
                    className="bg-white rounded-lg p-4 shadow-sm flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-medium">{apt.title}</h4>
                      <p className="text-sm text-gray-500">${apt.price}/mo</p>
                    </div>
                    <Heart className="w-5 h-5 text-red-500 fill-current" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;