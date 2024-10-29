import { type RemovableRef, useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export default function initStore<T>(key: string, defaultValue: T) {
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
    }
  })
}