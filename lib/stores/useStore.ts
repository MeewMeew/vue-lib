import { type RemovableRef, useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface AdditionalFunctions<T> {
  name: string;
  fn(object: RemovableRef<T>, ...args: any): Promise<any> | any;
}

export function useStore<T>(key: string, defaultValue: T, ...addFns: AdditionalFunctions<T>[]) {
  return defineStore(key, () => {
    const object = useStorage(key, ref<T>(defaultValue), localStorage, {
      serializer: {
        read: (v: string) => JSON.parse(v) as T,
        write: (v: any) => JSON.stringify(v),
      },
    });

    function set(newObject: T) {
      object.value = newObject;
    }

    function reset() {
      object.value = defaultValue;
    }

    return {
      object,
      set,
      reset,
      ...Object.fromEntries(
        addFns.map(({ name, fn }) => [
          name,
          function (...args: any) {
            return fn.apply(object, args);
          },
        ])
      ),
    };
  });
}