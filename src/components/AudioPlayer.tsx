import React, { useEffect, useRef } from 'react';

interface AudioPlayerProps {
    src: string;
    play: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, play }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Create audio element immediately
        const audio = new Audio(src);
        audio.volume = 0.5; // Increase volume to 50%
        audio.preload = 'auto'; // Preload the audio
        audioRef.current = audio;

        // Cleanup
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [src]);

    useEffect(() => {
        const playAudio = async () => {
            if (play && audioRef.current) {
                try {
                    audioRef.current.currentTime = 0;
                    await audioRef.current.play();
                } catch (e) {
                    console.error('Audio playback failed:', e);
                }
            }
        };

        playAudio();
    }, [play]);

    return null;
};