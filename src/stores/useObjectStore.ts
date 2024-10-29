import { type RemovableRef, useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
// @ts-ignore
import { ref } from 'vue'

interface AdditionalFunctions<T> {
  name: string
  fn(object: RemovableRef<T>, ...args: any): Promise<any> | any
}

/**
 * A utility function that initializes a store with a key, default value, and additional functions.
 * @param key - The key to use for the store.
 * @param defaultValue - The default value of the store.
 * @param addFns - Additional functions to add to the store.
 * @returns StoreDefinition
 * @example
 * const { object, set, reset, getAcronym } = initStore('user', { name: 'John Doe' }, { name: 'getAcronym', fn: getAcronym })
 * getAcronym('Nguyễn Văn A') // NA
 * object.value // { name: 'John Doe' }
 */

export default function initStore<T>(key: string, defaultValue: T, ...addFns: AdditionalFunctions<T>[]) {
  return defineStore(key, () => {
    const object = useStorage(key, ref<T>(defaultValue), localStorage, {
      serializer: {
        read: (v: string) => JSON.parse(v) as T,
        write: (v: any) => JSON.stringify(v)
      }
    }) as RemovableRef<T>

    function set(newObject: T) {
      object.value = newObject
    }

    function reset() {
      object.value = defaultValue
    }

    return {
      object,
      set,
      reset,
      ...Object.fromEntries(
        addFns.map(({ name, fn }) => [
          name,
          (...args: any) => fn(object, ...args),
        ])
      ),
    }
  })
}