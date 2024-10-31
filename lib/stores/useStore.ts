import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
/**
 * A simple object store that can be used to store and retrieve objects.
 * @param key - The key to store the value.
 * @param defaultValue - The default value of the store.
 * @returns - The Pinia base store object.
 */

export function useStore<T>(key: string, defaultValue: T) {
  return defineStore(key, () => {
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
}
