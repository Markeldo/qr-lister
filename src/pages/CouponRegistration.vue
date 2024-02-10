<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page class="column items-center justify-center page">
        <q-card>
          <q-card-section>
            <div class="bg-negative q-pa-md text-white" v-if="isError">
              <div class="text-h6">Указан ошибочный идентификатор купона.</div>
              Попробуйте отсканировать купон ещё раз.
            </div>
            <div class="column items-center" v-else>
              <div class="text-h6">Регистрация купона</div>
              <q-avatar
                :color="isRegistered ? 'green-14' : 'grey-6'"
                text-color="white"
                class="q-mb-md"
              >
                {{ coupon?.sequence_number }}
              </q-avatar>
            </div>
            <RegisterCouponBtn :id="id" v-if="!isRegistered && !isError" />
            <div v-if="isRegistered" class="bg-light-green-3 q-pa-md">
              Купон зарегистрирован
            </div>
            <q-inner-loading :showing="isLoading" />
          </q-card-section>
        </q-card>
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
const isError = computed(() => !!couponStore.error);

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
