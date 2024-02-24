<template>
  <q-form
    @submit="onFormSubmit"
    class="q-pa-md shadow-3"
    style="min-width: 400px"
  >
    <q-input
      outlined
      label="Название розыгрыша"
      v-model="formData.name"
      class="q-mb-md"
    />

    <div class="row items-center q-gutter-sm no-wrap">
      <q-icon
        v-if="!formData.logo"
        size="100px"
        name="hide_image"
        class="noAvatarIcon"
      />
      <img v-if="formData.logo" :src="formData.logo" />
      <div class="col q-gutter-sm">
        <div>Изображение в центре QR-кода</div>
        <div class="row items-center q-gutter-sm no-wrap">
          <UploadImage @change="onUploadImage" />
          <q-btn @click="onClearLogo" color="negative">Убрать</q-btn>
        </div>
      </div>
    </div>

    <div class="row q-gutter-sm q-mt-md">
      <q-btn color="primary" :loading="isLoading" class="q-mt-sm" type="submit">
        Сохранить
      </q-btn>
      <q-btn
        :loading="isLoading"
        class="q-mt-sm"
        type="cancel"
        @click="onClose"
      >
        Отмена
      </q-btn>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import {
  usePrizeGiveawayStore,
  useUsersPrizeGiveawayStore,
} from 'src/entities/prizeGiveaway';
import { useUserStore } from 'src/entities/user';
import { UploadImage } from 'src/shared/components';
import { useParams } from 'src/shared/composables';

type FormData = {
  name: string;
  logo?: string;
};
const formData = ref<FormData>({ name: '' });

const router = useRouter();
const { params } = useParams('id');
const giveawayStore = usePrizeGiveawayStore();
const userStore = useUserStore();
const usersGiveawayStore = useUsersPrizeGiveawayStore();

const id = computed(() => params.value?.id);
const giveaway = computed(() => giveawayStore.store.data);
const isLoading = computed(
  () => giveawayStore.store.isLoading || giveawayStore.store.isRefetching
);

const onFormSubmit = async () => {
  if (!id.value) {
    return;
  }
  await giveawayStore.update({
    id: id.value,
    ...formData.value,
  });
  usersGiveawayStore.read({ user_id: userStore.user.id });
  onClose();
};

const onClose = async () => {
  router.push({ name: 'main' });
};

const onUploadImage = (image: string) => {
  formData.value.logo = image;
};

const onClearLogo = () => {
  formData.value.logo = undefined;
};

watch(
  () => giveawayStore.store?.data,
  () => {
    formData.value = {
      name: giveaway.value?.name || '',
      logo: giveaway.value?.logo || undefined,
    };
  }
);

watch(id, (id) => (id ? giveawayStore.read(id) : undefined), {
  immediate: true,
});
</script>
