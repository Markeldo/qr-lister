<template>
  <section class="grid-container">
    <b>Список купонов</b>
    <div class="grid">
      <q-avatar
        v-for="coupon in coupons"
        :key="coupon.id"
        color="primary"
        text-color="white"
        >{{ coupon.sequence_number }}</q-avatar
      >
    </div>
  </section>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { computed } from 'vue';
import { useCouponsStore } from 'src/entities/coupon';

const props = defineProps<{ giveawayId: string }>();
const couponsStore = useCouponsStore();

const coupons = computed(() => couponsStore.store.data);

watch(
  () => props.giveawayId,
  (giveawayId) => {
    couponsStore.read({ giveaway_id: giveawayId });
  },
  { immediate: true }
);
</script>

<style lang="scss">
.grid-container {
  display: table;
  margin: 0 auto;
}
.grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-gap: 8px;
}
</style>
