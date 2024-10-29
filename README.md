# @meewmeew/vue-lib

## Install

```bash
bun add @meewmeew/vue-lib
# or
npm install @meewmeew/vue-lib
```

## Usage

```vue
<script setup lang="ts">
import { HiThere } from '@meewmeew/vue-lib'
</script>

<template>
  <HiThere />
</template>
```

## Components, Utilities

### Components

- `HiThere`: A simple component that says "Hi there!"

### Utilities

- `cn`: A utility function that concatenates class names.
- `getAcronym`: A utility function that returns the acronym of a string.
- `generatePath`: A utility function that generates a path from a route path and parameters.
- `normalizeVietnamese`: A utility function that normalizes Vietnamese text.
- `useStore`: A simple object store that can be used to store and retrieve objects.
