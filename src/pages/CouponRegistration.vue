<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="column items-center justify-center page">
        <div class="column items-center">
          Регистрация купона
          <q-avatar
            :color="isRegistered ? 'green-14' : 'grey-6'"
            text-color="white"
          >
            {{ coupon?.sequence_number }}
          </q-avatar>
        </div>
        <RegisterCouponBtn :id="id" v-if="!isRegistered" />
        <div v-if="isRegistered" class="bg-light-green-3 q-pa-md">
          Купон зарегистрирован
        </div>
        <q-inner-loading :showing="isLoading" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { computed } from 'vue';
import { RegisterCouponBtn } from 'src/features/RegisterCoupon';
import { useCouponStore } from 'src/entities/coupon';
import { useRouteParams } from 'src/shared/composables';

const { id } = useRouteParams('id');
const couponStore = useCouponStore();

const coupon = computed(() => couponStore.store?.data);
const isLoading = computed(() => couponStore.store.isLoading);
const isRegistered = computed(() => !!couponStore.store.data?.is_registered);

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

<style scoped lang="scss">
.column {
  gap: 24px;
  .column {
    gap: 8px;
  }
}
</style>
