<template>
  <q-dialog v-model="isDialogOpen" persistent>
    <q-card>
      <q-card-section class="row items-center">
        Уверены, что хотите удалить розыгрыш?
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Удалить" color="primary" @click="onDeleteSubmit" />
        <q-btn flat label="Отмена" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import {
  useApiPrizeGiveawayDelete,
  useUsersPrizeGiveawayStore,
} from 'src/entities/prizeGiveaway';
import { useUserStore } from 'src/entities/user';
import { useDeleteGiveawayDialog } from '../../model';

const userStore = useUserStore();
const useGiveawayStore = useUsersPrizeGiveawayStore();
const { deletePrizeGiveaway } = useApiPrizeGiveawayDelete();
const { isDialogOpen, selectedGiveawayId } = useDeleteGiveawayDialog();

const onDeleteSubmit = async () => {
  if (!selectedGiveawayId.value) {
    return;
  }
  await deletePrizeGiveaway(selectedGiveawayId.value);
  useGiveawayStore.read({ user_id: userStore.user.id });
  isDialogOpen.value = false;
  selectedGiveawayId.value = undefined;
};
</script>
