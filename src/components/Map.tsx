import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { PrairieDog } from '../types/PrairieDog';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface MapProps {
    prairieDogs: PrairieDog[];
}

export const Map: React.FC<MapProps> = ({ prairieDogs }) => {
    return (
        <MapContainer center={[40.7829, -73.9654]} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
            />
            {prairieDogs.map(dog => (
                <Marker key={dog.id} position={[dog.location.lat, dog.location.lng]}>
                    <Popup>
                        {dog.name} needs a {dog.sweaterSize} sweater!
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};
