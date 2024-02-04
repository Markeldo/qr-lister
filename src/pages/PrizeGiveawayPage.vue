<template>
  <div class="row justify-between">
    {{ id }}
    <q-space />
    <AddCouponsForm :giveawayId="id" />
  </div>
</template>

<script setup lang="ts">
import { AddCouponsForm } from 'src/features/AddCoupons';
import { useRouteParams } from 'src/shared/composables';

const { id } = useRouteParams('id');
</script>
