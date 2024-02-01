<template>
  <q-btn @click="onClick">Добавить розыгрыш</q-btn>
</template>

<script setup lang="ts">
import { useAddGiveawayDialog } from '../../model/useAddGiveawayDialog';

const isDialogOpen = useAddGiveawayDialog();

const onClick = () => {
  isDialogOpen.value = true;
};
</script>
