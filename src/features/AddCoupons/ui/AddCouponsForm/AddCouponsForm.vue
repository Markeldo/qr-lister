<template>
  <q-select
    size="sm"
    dense
    outlined
    :options="options"
    v-model="couponsCount"
  />
  <q-btn @click="AddCoupons">Добавить купоны</q-btn>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useApiCouponsCreate } from 'src/entities/coupon';

const props = defineProps<{ giveawayId: string }>();
const couponsCount = ref(10);
const options = [1, 10, 30, 50, 100];
const { createCoupons } = useApiCouponsCreate();

const AddCoupons = () => {
  createCoupons(
    [...Array(couponsCount.value + 1).keys()]
      .slice(1)
      .map((e, i) => ({
        giveaway_id: props.giveawayId,
        sequence_number: i + 1,
      }))
  );
};
</script>
