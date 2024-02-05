<template>
  <div class="row justify-between q-mb-lg">
    {{ id }}
    <q-space />
    <AddCouponsForm :giveawayId="id" />
  </div>
  <CouponsWidget :giveawayId="id" />
</template>

<script setup lang="ts">
import { CouponsWidget } from 'src/widgets/CouponsWidget';
import { AddCouponsForm } from 'src/features/AddCoupons';
import { useRouteParams } from 'src/shared/composables';

const { id } = useRouteParams('id');
</script>
