import { Window } from 'typescript';

declare global {
  interface Window {
    global: typeof globalThis;
  }
}

export {};
