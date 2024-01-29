<template>
  <div class="text-center q-mb-md">
    Впервые у нас? /
    <a href="#" @click.prevent="switchTab(tabTypes.registration)"
      >Регистрация</a
    >
    <LoginRegisterForm :tab="panel" :switch-tab="switchTab" />
  </div>
</template>

<script setup lang="ts">
import { LoginRegisterForm } from 'src/features/LoginRegisterUser';
import { tabTypes } from 'src/shared/constants';
import { TabType } from 'src/shared/types';

defineProps<{
  panel: TabType;
  switchTab: (switchTo: TabType) => void;
}>();
</script>
