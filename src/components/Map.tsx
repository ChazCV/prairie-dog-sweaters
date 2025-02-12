import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { PrairieDog } from '../types/PrairieDog';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons with public URL path
const iconUrl = process.env.PUBLIC_URL + '/marker-icon.png';
const iconRetinaUrl = process.env.PUBLIC_URL + '/marker-icon-2x.png';
const shadowUrl = process.env.PUBLIC_URL + '/marker-shadow.png';

L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
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
