<template>
  <q-page class="row items-center justify-evenly">
    <div class="myClass">
      <AddGiveawayBtn />
    </div>
  </q-page>
  <AddGiveawayDialog />
</template>

<script setup lang="ts">
import {
  AddGiveawayBtn,
  AddGiveawayDialog,
} from 'src/features/AddPrizeGiveaway';
</script>

<style scoped lang="scss">
.myClass {
  color: $primary;
}
</style>
