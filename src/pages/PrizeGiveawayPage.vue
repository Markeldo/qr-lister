<template>
  {{ id }}
</template>

<script setup lang="ts">
import { useRouteParams } from 'src/shared/composables';

const { id } = useRouteParams('id');
</script>
