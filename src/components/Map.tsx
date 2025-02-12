import React, { useCallback, useMemo, useState } from 'react';
import { Map, Marker, Popup } from 'react-map-gl';
import type { ErrorEvent } from 'react-map-gl';
import { PrairieDog } from '../types/PrairieDog';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoidGVuZGVyYml0dGxlIiwiYSI6ImNtMXhwa25pOTAweHEya29xNXhoNmNwZ2cifQ.WEn7ZT_X--d9Vcgg2_G0kQ';

interface MapProps {
    prairieDogs: PrairieDog[];
    onSelectDog: (dog: PrairieDog | null) => void;
    selectedDog: PrairieDog | null;
}

const WarningIcon = () => (
    <svg width="25" height="41" viewBox="0 0 25 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.5 0C5.596 0 0 5.596 0 12.5C0 21.875 12.5 41 12.5 41S25 21.875 25 12.5C25 5.596 19.404 0 12.5 0Z" fill="#ff4d4d"/>
        <path d="M11.5 8h2v14h-2zm0 16h2v2h-2z" fill="white"/>
    </svg>
);

export const MapComponent: React.FC<MapProps> = ({ prairieDogs, onSelectDog, selectedDog }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [viewport, setViewport] = useState({});

    const onSelectMarker = useCallback((e: React.MouseEvent, dog: PrairieDog) => {
        e.stopPropagation();
        onSelectDog(dog);
        
        const sound = document.getElementById('clickSound') as HTMLAudioElement;
        if (sound) {
            sound.currentTime = 0;
            sound.volume = 1.0;
            sound.play().catch(error => {
                console.error('Audio playback failed:', error);
            });
        }
    }, [onSelectDog]);

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

    const markers = useMemo(() => prairieDogs.map(dog => (
        <Marker
            key={dog.id}
            longitude={dog.location.lng}
            latitude={dog.location.lat}
            anchor="bottom"
        >
            <div 
                onClick={e => onSelectMarker(e, dog)}
                className={`marker-icon-container ${selectedDog?.id === dog.id ? 'selected' : ''}`}
                style={{ 
                    transform: `translate3d(0,0,0)`,
                    willChange: 'transform',
                    contain: 'layout style paint'
                }}
            >
                <WarningIcon />
            </div>
        </Marker>
    )), [prairieDogs, selectedDog, onSelectMarker]);

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
        <div className="map-container">
            {!isLoaded && (
                <div className="map-loading">
                    <p>Loading map...</p>
                </div>
            )}
            <Map
                {...viewport}
                initialViewState={bounds || {
                    longitude: -98.5795,
                    latitude: 39.8283,
                    zoom: 4,
                    padding: { top: 50, bottom: 50, left: 50, right: 50 }
                }}
                onLoad={onMapLoad}
                onError={handleError}
                onMove={evt => setViewport(evt.viewState)}
                mapStyle="mapbox://styles/mapbox/outdoors-v12"
                mapboxAccessToken={MAPBOX_TOKEN}
                dragRotate={false}
                renderWorldCopies={false}
                style={{ width: '100%', height: '100%' }}
                maxBounds={[
                    [-140, 25],
                    [-60, 50]
                ]}
            >
                {markers}
            </Map>
        </div>
    );
};
