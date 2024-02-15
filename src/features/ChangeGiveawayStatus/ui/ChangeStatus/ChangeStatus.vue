<template>
  <q-select
    size="sm"
    dense
    outlined
    :options="GIVEAWAY_STATUS_OPTIONS"
    v-model="currentStatus"
    @update:model-value="onChangeStatus"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { computed } from 'vue';
import {
  GIVEAWAY_STATUS_OPTIONS,
  GiveawayStatusOption,
  usePrizeGiveawayStore,
} from 'src/entities/prizeGiveaway';

const giveawayStore = usePrizeGiveawayStore();
const currentStatus = ref<GiveawayStatusOption>();

const status = computed(() => giveawayStore.store.data?.status);
const giveawayId = computed(() => giveawayStore.store.data?.id);

const onChangeStatus = ({ value }: GiveawayStatusOption) => {
  if (!giveawayId.value) {
    return;
  }
  giveawayStore.updateStatus({ id: giveawayId.value, status: value });
};

watch(
  status,
  (currentValue) => {
    if (!currentValue) {
      return;
    }
    currentStatus.value = GIVEAWAY_STATUS_OPTIONS.find(
      ({ value }) => value === currentValue
    );
  },
  { immediate: true }
);
</script>
