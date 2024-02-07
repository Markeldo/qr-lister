<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="column items-center justify-center">
        --{{ coupon?.sequence_number }}--
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { computed } from 'vue';
import { useCouponStore } from 'src/entities/coupon';
import { useRouteParams } from 'src/shared/composables';

const { id } = useRouteParams('id');
const couponStore = useCouponStore();

const coupon = computed(() => couponStore.store?.data);

watch(
  () => id,
  () => {
    couponStore.read(id);
  },
  {
    immediate: true,
  }
);
</script>
