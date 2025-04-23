import { writable } from 'svelte/store';

export const currentAudio = writable<HTMLAudioElement | null>(null);
