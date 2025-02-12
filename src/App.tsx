import React, { useEffect, useState } from 'react';
import { MapComponent } from './components/Map';
import { getPrairieDogs } from './services/prairieDogService';
import { PrairieDog } from './types/PrairieDog';

function App() {
    const [prairieDogs, setPrairieDogs] = useState<PrairieDog[]>([]);

    useEffect(() => {
        getPrairieDogs().then(setPrairieDogs);
    }, []);

    return (
        <div className="App">
            <div className="header">
                <h1>Prairie Dogs Needing Sweaters 🦫</h1>
                <p className="subtitle">Hurry Brandon! Knit faster or we're all gonna die!!!</p>
            </div>
            <MapComponent prairieDogs={prairieDogs} />
            <div className="prairie-dog-list">
                {prairieDogs.map(dog => (
                    <div key={dog.id} className="prairie-dog-card">
                        <h3>{dog.name}</h3>
                        <div className="colony-info">
                            <p><strong>Colony:</strong> {dog.colonyName}</p>
                            <p><strong>Family Size:</strong> {dog.familySize} prairie dogs</p>
                        </div>
                        <p className="temperature">
                            <strong>Current Temperature:</strong> {dog.temperature}°F
                        </p>
                        <p><strong>Needs:</strong> {dog.sweaterSize} size sweater</p>
                        <div className="story-section">
                            <p><strong>Story:</strong> {dog.story}</p>
                        </div>
                        <div className="impact-section">
                            <p><strong>Weather Impact:</strong> {dog.weatherImpact}</p>
                        </div>
                        <p><small>Last seen: {new Date(dog.lastSeenDate).toLocaleDateString()}</small></p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
