import { PrairieDog } from '../types/PrairieDog';

const mockPrairieDogs: PrairieDog[] = [
    {
        id: '1',
        name: 'Whiskers',
        location: { lat: 40.7829, lng: -73.9654 },
        sweaterSize: 'S',
        needsSweater: true,
        lastSeenDate: '2023-11-15'
    },
    {
        id: '2',
        name: 'Poppy',
        location: { lat: 40.7580, lng: -73.9855 },
        sweaterSize: 'XS',
        needsSweater: true,
        lastSeenDate: '2023-11-14'
    }
];

export const getPrairieDogs = (): Promise<PrairieDog[]> => {
    return Promise.resolve(mockPrairieDogs);
};
