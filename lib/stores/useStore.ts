import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export interface ReturnObject<T> {
  get: () => T;
  set: (newObject: T) => void;
  reset: () => void;
}

/**
 * A simple object store that can be used to store and retrieve objects.
 * @param key - The key to store the value.
 * @param defaultValue - The default value of the store.
 * @returns - An object containing the get, set, and reset functions.
 */

export function useStore<T>(key: string, defaultValue: T): ReturnObject<T> {
  const storeInstance = defineStore(key, () => {
    const object = useStorage(key, defaultValue, localStorage);

    function set(newObject: T) {
      object.value = newObject;
    }

    function reset() {
      object.value = defaultValue;
    }

    function get() {
      return object.value;
    }

    return {
      get,
      set,
      reset,
    };
  });

  return storeInstance();
}
