export interface PrairieDog {
    id: string;
    name: string;
    location: {
        lat: number;
        lng: number;
    };
    sweaterSize: 'XS' | 'S' | 'M' | 'L';
    needsSweater: boolean;
    lastSeenDate: string;
}
