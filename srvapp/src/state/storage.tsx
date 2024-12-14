// storage.ts
import {MMKV} from 'react-native-mmkv';

export const tokenStorage = new MMKV({
  id: 'user-storage',
  encryptionKey: 'some_secret_key',
});

export const storage = new MMKV({
  id: 'my-app-storage',
  encryptionKey: 'some_secret_key',
});

export const mmkvStorage = {
  // Fixed typo: setItem instead of setIem
  setItem: (key: string, value: string) => {
    try {
      storage.set(key, value);
    } catch (error) {
      console.error(`Error setting item ${key}:`, error);
    }
  },

  // Fixed typo: getItem instead of getIem
  getItem: (key: string) => {
    try {
      const value = storage.getString(key);
      return value ?? null;
    } catch (error) {
      console.error(`Error getting item ${key}:`, error);
      return null;
    }
  },

  removeItem: (key: string) => {
    try {
      storage.delete(key);
    } catch (error) {
      console.error(`Error removing item ${key}:`, error);
    }
  },

  // Added clear method for completeness
  clear: () => {
    try {
      storage.clearAll();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};

// Additional utility methods for token storage
export const tokenStorageUtils = {
  setAccessToken: (token: string) => {
    tokenStorage.set('accessToken', token);
  },

  getAccessToken: () => {
    return tokenStorage.getString('accessToken') ?? null;
  },

  setRefreshToken: (token: string) => {
    tokenStorage.set('refreshToken', token);
  },

  getRefreshToken: () => {
    return tokenStorage.getString('refreshToken') ?? null;
  },

  clearTokens: () => {
    tokenStorage.delete('accessToken');
    tokenStorage.delete('refreshToken');
  },
};
