<template>
  <q-btn @click.prevent="onClick" round icon="close" size="xs" />
</template>

<script setup lang="ts">
import { useDeleteGiveawayDialog } from '../../model';

const props = defineProps<{ giveawayId: string }>();

const { isDialogOpen, selectedGiveawayId } = useDeleteGiveawayDialog();

const onClick = () => {
  isDialogOpen.value = true;
  selectedGiveawayId.value = props.giveawayId;
};
</script>
