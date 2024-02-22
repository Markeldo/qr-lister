<template>
  <div class="row justify-between items-center q-mb-lg relative-position">
    {{ giveaway?.name }}
    <ChangeStatus />
    <q-space />
    <AddCouponsForm v-if="giveaway?.status === 'active'" :giveawayId="id" />
    <q-btn
      v-if="giveaway?.status === 'active'"
      :to="{ name: 'printCoupons', params: { id } }"
      icon="print"
      title="Распечатать купоны"
    />
    <q-btn
      v-if="giveaway?.status === 'registration_closed'"
      :to="{
        name: 'conducting',
        params: { id: id },
      }"
      color="primary"
    >
      Разыграть
    </q-btn>
    <q-btn
      icon="settings"
      :to="{ name: 'prizeGiveawaySettings', params: { id } }"
    />
    <q-inner-loading :showing="isRefetching" />
  </div>
  <CouponsWidget :giveawayId="id" />
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { CouponsWidget } from 'src/widgets/CouponsWidget';
import { AddCouponsForm } from 'src/features/AddCoupons';
import { ChangeStatus } from 'src/features/ChangeGiveawayStatus';
import { usePrizeGiveawayStore } from 'src/entities/prizeGiveaway';
import { useParams } from 'src/shared/composables';

const { params } = useParams('id');
const prizeGiveawayStore = usePrizeGiveawayStore();

const id = computed(() => params.value?.id || '');
const giveaway = computed(() => prizeGiveawayStore.store?.data);
const isRefetching = computed(() => prizeGiveawayStore.store.isRefetching);

watch(
  id,
  (id) => {
    if (id) {
      prizeGiveawayStore.read(id);
    }
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.row {
  gap: 16px;
  padding: 20px;
}
</style>
