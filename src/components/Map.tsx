import React, { useCallback, useMemo, useState } from 'react';
import { Map, Marker, Popup } from 'react-map-gl';
import type { ErrorEvent } from 'react-map-gl';
import { PrairieDog } from '../types/PrairieDog';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoidGVuZGVyYml0dGxlIiwiYSI6ImNtMXhwa25pOTAweHEya29xNXhoNmNwZ2cifQ.WEn7ZT_X--d9Vcgg2_G0kQ';

interface MapProps {
    prairieDogs: PrairieDog[];
}

export const MapComponent: React.FC<MapProps> = ({ prairieDogs }) => {
    const [popupInfo, setPopupInfo] = useState<PrairieDog | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const bounds = useMemo(() => {
        if (prairieDogs.length === 0) return undefined;

        const lngs = prairieDogs.map(dog => dog.location.lng);
        const lats = prairieDogs.map(dog => dog.location.lat);

        return {
            longitude: (Math.min(...lngs) + Math.max(...lngs)) / 2,
            latitude: (Math.min(...lats) + Math.max(...lats)) / 2,
            zoom: 4,
            padding: { top: 50, bottom: 50, left: 50, right: 50 }
        };
    }, [prairieDogs]);

    const onMapLoad = useCallback(() => {
        setIsLoaded(true);
    }, []);

    const handleError = useCallback((evt: ErrorEvent) => {
        setError(evt.error.message || 'An error occurred loading the map');
    }, []);

    if (error) {
        return (
            <div className="map-error">
                <p>Error loading map: {error}</p>
            </div>
        );
    }

    return (
        <div style={{ width: '100%', height: '85vh', position: 'relative' }}>
            {!isLoaded && (
                <div className="map-loading">
                    <p>Loading map...</p>
                </div>
            )}
            <Map
                initialViewState={bounds || {
                    longitude: -98.5795,
                    latitude: 39.8283,
                    zoom: 4,
                    padding: { top: 50, bottom: 50, left: 50, right: 50 }
                }}
                onLoad={onMapLoad}
                onError={handleError}
                mapStyle="mapbox://styles/mapbox/outdoors-v12"
                mapboxAccessToken={MAPBOX_TOKEN}
                dragRotate={false}
                style={{ width: '100%', height: '100%' }}
                maxBounds={[
                    [-140, 25], // Southwest coordinates
                    [-60, 50]   // Northeast coordinates
                ]}
            >
                {prairieDogs.map(dog => (
                    <Marker
                        key={dog.id}
                        longitude={dog.location.lng}
                        latitude={dog.location.lat}
                        anchor="bottom"
                    >
                        <div 
                            onClick={e => {
                                e.stopPropagation();
                                setPopupInfo(dog);
                            }}
                            className="marker-icon-container"
                        >
                            <img 
                                src="/marker-icon.png" 
                                alt="marker" 
                                style={{ width: 25, height: 41 }}
                            />
                        </div>
                    </Marker>
                ))}

                {popupInfo && (
                    <Popup
                        longitude={popupInfo.location.lng}
                        latitude={popupInfo.location.lat}
                        anchor="bottom"
                        offset={[0, -41] as [number, number]}
                        closeButton={true}
                        closeOnClick={false}
                        maxWidth="500px"
                        onClose={() => setPopupInfo(null)}
                    >
                        <div className="popup-content">
                            <h3>{popupInfo.name}</h3>
                            <div className="colony-info">
                                <p><strong>Colony:</strong> {popupInfo.colonyName}</p>
                                <p><strong>Family Size:</strong> {popupInfo.familySize} prairie dogs</p>
                            </div>
                            <p className="temperature">
                                <strong>Current Temperature:</strong> {popupInfo.temperature}°F
                            </p>
                            <p><strong>Needs:</strong> {popupInfo.sweaterSize} size sweater</p>
                            <div className="story-section">
                                <p><strong>Story:</strong> {popupInfo.story}</p>
                            </div>
                            <div className="impact-section">
                                <p><strong>Weather Impact:</strong> {popupInfo.weatherImpact}</p>
                            </div>
                            <p><small>Last seen: {new Date(popupInfo.lastSeenDate).toLocaleDateString()}</small></p>
                        </div>
                    </Popup>
                )}
            </Map>
        </div>
    );
};
