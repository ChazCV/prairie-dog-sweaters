import React, { useEffect, useState } from 'react';
import { MapComponent } from './components/Map';
import { getPrairieDogs } from './services/prairieDogService';
import { PrairieDog } from './types/PrairieDog';

function App() {
    const [prairieDogs, setPrairieDogs] = useState<PrairieDog[]>([]);
    const [selectedDog, setSelectedDog] = useState<PrairieDog | null>(null);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        const fetchAndProcessDogs = async () => {
            const dogs = await getPrairieDogs();
            const processedDogs = dogs.map(dog => {
                const end = new Date('2025-02-12').getTime();
                const start = new Date('2024-01-01').getTime();
                
                // Use power distribution for more recent dates
                const random = Math.random();
                // Using power of 5 for even stronger weighting towards recent dates
                const weight = 1 - Math.pow(random, 5);
                const timestamp = start + (weight * (end - start));
                
                return {
                    ...dog,
                    lastSeenDate: new Date(timestamp).toISOString()
                };
            });
            
            setPrairieDogs(processedDogs);
        };

        fetchAndProcessDogs();
    }, []);

    const handleSelectDog = (dog: PrairieDog | null) => {
        if (dog) {
            setSelectedDog(dog);
            setHasInteracted(true);
        }
    };

    return (
        <div className="App">
            <div className="header">
                <h1>Prairie Dogs Needing Sweaters 🦫</h1>
                <p className="subtitle">Hurry Brandon! Knit faster or we're all gonna die!!!</p>
            </div>
            <div className="main-content">
                <div className="prairie-dog-list">
                    {!hasInteracted ? (
                        <div className="initial-message">
                            <p>Each alert on the map represents a prairie dog family shivering in the cold. Click on any marker to discover their story and learn how your handmade sweaters can bring warmth and hope to these brave little souls. Together, we can make their winter a little cozier. 💝🧶</p>
                        </div>
                    ) : selectedDog && (
                        <div className="prairie-dog-card">
                            <h3>{selectedDog.name}</h3>
                            <div className="colony-info">
                                <p><strong>Colony:</strong> {selectedDog.colonyName}</p>
                                <p><strong>Family Size:</strong> {selectedDog.familySize} prairie dogs</p>
                            </div>
                            <p className="temperature">
                                <strong>Current Temperature:</strong> {selectedDog.temperature}°F
                            </p>
                            <p><strong>Needs:</strong> {selectedDog.sweaterSize} size sweater</p>
                            <div className="story-section">
                                <p><strong>Story:</strong> {selectedDog.story}</p>
                            </div>
                            <div className="impact-section">
                                <p><strong>Weather Impact:</strong> {selectedDog.weatherImpact}</p>
                            </div>
                            <p><small>Last seen: {new Date(selectedDog.lastSeenDate).toLocaleDateString()}</small></p>
                        </div>
                    )}
                </div>
                <MapComponent 
                    prairieDogs={prairieDogs} 
                    onSelectDog={handleSelectDog} 
                    selectedDog={selectedDog} 
                />
            </div>
        </div>
    );
}

export default App;
