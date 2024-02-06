<template>
  <div class="listContainer">
    <CouponCard
      v-for="coupon in coupons"
      :key="coupon.id"
      :couponId="coupon.id"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { CouponCard, useCouponsStore } from 'src/entities/coupon';
import { useRouteParams } from 'src/shared/composables';

const { id } = useRouteParams('id');
const couponsStore = useCouponsStore();

const coupons = computed(() =>
  couponsStore.store.data?.filter(({ registered_on }) => !registered_on)
);

watch(
  () => id,
  (giveawayId) => {
    couponsStore.read({ giveaway_id: giveawayId });
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.listContainer {
  display: flex;
  flex-wrap: wrap;
  > * {
    max-width: 50%;
    &:not(:last-child) {
      &:nth-child(8n) {
        page-break-after: always;
      }
    }
  }
}
</style>
