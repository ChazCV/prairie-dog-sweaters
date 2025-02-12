import React, { useEffect, useState } from 'react';
import { Map } from './components/Map';
import { getPrairieDogs } from './services/prairieDogService';
import { PrairieDog } from './types/PrairieDog';

function App() {
    const [prairieDogs, setPrairieDogs] = useState<PrairieDog[]>([]);

    useEffect(() => {
        getPrairieDogs().then(setPrairieDogs);
    }, []);

    return (
        <div className="App">
            <h1>Prairie Dogs Needing Sweaters 🦫</h1>
            <Map prairieDogs={prairieDogs} />
            <div className="prairie-dog-list">
                {prairieDogs.map(dog => (
                    <div key={dog.id} className="prairie-dog-card">
                        <h3>{dog.name}</h3>
                        <p>Sweater Size: {dog.sweaterSize}</p>
                        <p>Last seen: {dog.lastSeenDate}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
