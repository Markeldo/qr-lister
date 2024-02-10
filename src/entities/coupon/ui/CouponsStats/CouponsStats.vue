<template>
  <div>
    Всего: {{ couponsStore.currentCouponsCount }} Зарегистрировано:
    <span class="text-green-14">{{
      couponsStore.registeredCoupounsCount
    }}</span>
  </div>
</template>

<script setup lang="ts">
import { useCouponsStore } from '../..';

const couponsStore = useCouponsStore();
</script>
