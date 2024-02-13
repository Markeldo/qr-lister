<template>
  <div class="grid">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 8px;
}
</style>
