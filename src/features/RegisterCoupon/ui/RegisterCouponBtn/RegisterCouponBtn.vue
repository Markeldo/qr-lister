<template>
  <q-btn
    color="primary"
    label="Зарегистрировать купон"
    class="q-mt-sm"
    type="submit"
    @click="registerCoupon"
  />
</template>

<script setup lang="ts">
import { useCouponStore } from 'src/entities/coupon';
const props = defineProps<{ id: string }>();

const couponStore = useCouponStore();
const registerCoupon = () => {
  couponStore.updateIsRegistered(props.id);
};
</script>
