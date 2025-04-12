import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';
import L from 'leaflet';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const pointsOfInterest = [
  { name: "Port Louis", position: [-20.1609, 57.5012], description: "Capitale de l'île Maurice" },
  { name: "Grand Baie", position: [-20.0182, 57.5802], description: "Station balnéaire populaire" },
  { name: "Le Morne", position: [-20.4560, 57.3089], description: "Site du patrimoine mondial de l'UNESCO" },
  { name: "Flic en Flac", position: [-20.2747, 57.3614], description: "Plage populaire" },
  { name: "Chamarel", position: [-20.4275, 57.3792], description: "Terre des Sept Couleurs" }
];

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Carte de l'Île Maurice</h1>
        <div className="h-[600px] rounded-lg overflow-hidden shadow-lg">
          <MapContainer 
            center={[-20.348404, 57.552152]} 
            zoom={10} 
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
            {pointsOfInterest.map((poi, index) => (
              <Marker key={index} position={poi.position as [number, number]}>
                <Popup>
                  <div className="font-semibold">{poi.name}</div>
                  <div className="text-sm">{poi.description}</div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <div className="mt-4 bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Points d'intérêt</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pointsOfInterest.map((poi, index) => (
              <div key={index} className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-red-500" />
                <div>
                  <div className="font-medium">{poi.name}</div>
                  <div className="text-sm text-gray-600">{poi.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;