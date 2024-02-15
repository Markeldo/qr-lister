<template>
  <section class="grid-container">
    <div class="flex">
      <b>Список купонов</b>
      <q-space />
      <CouponsStats />
    </div>
    <AppGrid>
      <q-btn
        flat
        dense
        round
        v-for="coupon in coupons"
        :key="coupon.id"
        @click="openCouponCard(coupon.id)"
      >
        <q-avatar
          :color="
            coupon.winner
              ? 'amber-8'
              : coupon.is_registered
              ? 'green-14'
              : 'grey-6'
          "
          text-color="white"
        >
          {{ coupon.sequence_number }}
        </q-avatar>
      </q-btn>
    </AppGrid>
  </section>

  <q-dialog v-model="openDialog" v-if="couponId">
    <CouponCard :couponId="couponId" />
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { computed } from 'vue';
import { CouponCard, CouponsStats, useCouponsStore } from 'src/entities/coupon';
import { AppGrid } from 'src/shared/components';

const props = defineProps<{ giveawayId: string }>();
const couponsStore = useCouponsStore();

const openDialog = ref(false);
const couponId = ref<string | undefined>(undefined);

const coupons = computed(() => couponsStore.store.data);

const openCouponCard = (id: string) => {
  openDialog.value = true;
  couponId.value = id;
};

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
</style>
