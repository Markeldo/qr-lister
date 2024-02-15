<template>
  <q-btn @click="saveResult" class="bg-amber-8 text-white q-mb-sm" size="large">
    Сохранить результат
  </q-btn>
</template>

<script setup lang="ts">
import { useCouponStore } from 'src/entities/coupon';

const props = defineProps<{ id: string }>();
const { setWinner } = useCouponStore();

const emit = defineEmits<{ (e: 'winnerIsSet'): void }>();

const saveResult = () => {
  setWinner(props.id);
  emit('winnerIsSet');
};
</script>
