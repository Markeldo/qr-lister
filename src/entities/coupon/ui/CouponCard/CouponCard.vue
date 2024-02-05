<template>
  <q-card>
    <q-card-section horizontal>
      <q-card-section>
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />
      </q-card-section>
      <q-card-section>
        {{ coupon?.sequence_number }}
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCouponsStore } from '../../model';

const props = defineProps<{ couponId: string }>();
const couponsStore = useCouponsStore();

const coupon = computed(() =>
  couponsStore.store.data?.find(({ id }) => id === props.couponId)
);
</script>
