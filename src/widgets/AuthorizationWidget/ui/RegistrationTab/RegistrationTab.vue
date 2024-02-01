<template>
  <p className="text-center q-ma-lg">
    Регистрируясь в приложении, Вы подтверждаете согласие c
    <a href="#">Положением и условиями</a>
  </p>
  <LoginRegisterForm :tab="panel" />
  <q-separator spaced="lg" class="full-width-separator" />
  <q-btn outline @click.prevent="switchTab(tabTypes.login)" class="full-width">
    Вернуться ко входу
  </q-btn>
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
