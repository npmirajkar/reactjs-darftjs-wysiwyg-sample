// File: src/utils/mockApi.ts
import { RawDraftContentState } from 'draft-js';

const STORAGE_KEY = 'draftjs_content';

export const mockFetchContent = (): Promise<RawDraftContentState | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const savedContent = localStorage.getItem(STORAGE_KEY);
      resolve(savedContent ? JSON.parse(savedContent) : null);
    }, 300);
  });
};

export const mockSaveContent = (
  content: RawDraftContentState
): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
      resolve({ success: true });
    }, 300);
  });
};
