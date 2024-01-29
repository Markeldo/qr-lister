<template>
  <q-tab-panels v-model="activePanel">
    <q-tab-panel :name="tabTypes.login">
      <LoginTab :panel="activePanel" :switchTab="switchTab" />
    </q-tab-panel>
    <q-tab-panel :name="tabTypes.registration">
      <RegistrationTab :panel="activePanel" :switchTab="switchTab" />
    </q-tab-panel>
  </q-tab-panels>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { LoginTab, RegistrationTab } from 'src/widgets/AuthorizationWidget';
import { tabTypes } from 'src/shared/constants';
import { TabType } from 'src/shared/types';

const activePanel = ref<TabType>(tabTypes.login);

const switchTab = (switchTo: TabType) => {
  activePanel.value = switchTo;
};
</script>
