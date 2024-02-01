<template>
  <q-form @submit.prevent="onClick">
    <q-input
      outlined
      v-if="tab !== tabTypes.login"
      v-model="formData.name"
      class="q-mb-md"
      label="Никнейм (прозвище)"
      :rules="[required]"
    />

    <q-input
      outlined
      v-model="formData.email"
      class="q-mb-md"
      label="E-mail"
      type="email"
      :rules="[required, email]"
    />

    <q-input
      outlined
      v-model="formData.password"
      class="q-mb-md"
      label="Пароль"
      type="password"
      :rules="[required]"
    />

    <q-input
      outlined
      v-if="tab === tabTypes.registration"
      v-model="formData.passwordConfirm"
      class="q-mb-md"
      label="Подтверждение пароля"
      type="password"
      :rules="[
        required,
        (val: string) => (val && val === formData.password) || 'Must match password.',
      ]"
    />

    <div v-if="tab === tabTypes.login" class="text-center q-mb-sm">
      Забыли пароль? /
      <a
        href="#"
        @click.prevent="switchTab && switchTab(tabTypes.resetPassword)"
        color="secondary"
        >Восстановление</a
      >
    </div>

    <q-btn
      :loading="userStore.isLoading"
      class="full-width"
      type="submit"
      color="primary"
      :label="tab === tabTypes.login ? `Войти` : `Зарегистрироваться`"
    />
  </q-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from 'src/entities/user';
import { tabTypes } from 'src/shared/constants';
import { email, required } from 'src/shared/lib';
import { TabType } from 'src/shared/types';
import { ILoginRegisterFormData } from '../../model';

const router = useRouter();
const userStore = useUserStore();
const { userLogIn, userRegister } = userStore;

const props = defineProps<{
  tab: TabType;
  switchTab?: (switchTo: TabType) => void;
}>();

const formData: ILoginRegisterFormData = reactive({
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
});

const onClick = async () => {
  try {
    if (props.tab === 'login') {
      await userLogIn(formData);
    } else {
      await userRegister(formData);
    }
    // TODO: Сделать страницу заполнения профиля
    // if (userStore.isCurrentUserFullfilled) {
    router.push({ path: '/' });
    /*} else {
      router.push({ path: '/empty-profile' });
    }*/
  } catch (error) {
    console.log(error);
  }
};
</script>
