<template>
  <q-dialog v-model="isDialogOpen">
    <q-card>
      <q-card-section>
        <q-form @submit="onFormSubmit">
          <q-input label="Название розыгрыша" v-model="formData.name" />

          <q-btn class="q-mt-sm" type="submit">Добавить</q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useApiPrizeGiveawayCreate } from 'src/entities/prizeGiveaway';
import { useUserStore } from 'src/entities/user';
import { useAddGiveawayDialog } from '../../model/useAddGiveawayDialog';
type FormData = {
  name: string;
};
const formData = ref<FormData>({ name: '' });

const userStore = useUserStore();
const { createPrizeGiveaway } = useApiPrizeGiveawayCreate();
const isDialogOpen = useAddGiveawayDialog();

const onFormSubmit = () => {
  createPrizeGiveaway({ ...formData.value, user_id: userStore.user.id });
};
</script>
