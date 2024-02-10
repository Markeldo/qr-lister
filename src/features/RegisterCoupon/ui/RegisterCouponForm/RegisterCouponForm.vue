<template>
  <q-form v-if="coupon" @submit="onFormSubmit" style="width: 450px">
    <q-input label="Укажите Ваши имя и фамилию" v-model="formData.owner_name" />
    <q-input
      label="Ваш телефон"
      debounce="500"
      v-model="formData.owner_phone"
      type="tel"
      mask="+7 (###) ### - ####"
      :rules="[
        (val) =>
          /(\+7 \(\d{3}\) \d{3} - \d{4})/.test(val) ||
          'Введите корректный номер телефона',
      ]"
    />

    <q-btn
      color="primary"
      label="Зарегистрировать купон"
      class="q-mt-sm"
      type="submit"
    />
  </q-form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { computed } from 'vue';
import { useCouponStore } from 'src/entities/coupon';

const props = defineProps<{ id: string }>();

const couponStore = useCouponStore();
type FormData = {
  owner_name: string;
  owner_phone: string;
};
const formData = ref<FormData>({ owner_name: '', owner_phone: '' });

const coupon = computed(() => couponStore.store.data);

const onFormSubmit = async () => {
  await couponStore.updateOwner({ ...formData.value, id: props.id });
  console.log(formData);
};

watch(
  coupon,
  (curValue) =>
    (formData.value = {
      owner_name: curValue?.owner_name || '',
      owner_phone: curValue?.owner_phone || '',
    })
);
</script>
