import { computed, ref } from 'vue';
import { Notify } from 'quasar';
import { defineStore } from 'pinia';
import { supabase } from 'src/app/boot/supabase';
import { IUserGetDataFunction, IUserStore, RegisterPayloadData } from './types';

const initialUserState: IUserStore = {
  id: '',
};

export const useUserStore = defineStore('user', () => {
  // state
  const userStore = ref<IUserStore>(initialUserState);
  const isLoading = ref(false);
  const isDataFetched = ref(false);

  //getters
  const isCurrentUserFullfilled = computed(() => {
    //TBD
    const requiredFields = [
      'surname',
      'name',
      'nickname',
      'email',
      'birthdate',
      'position',
    ];
    const result = requiredFields.some(
      (i) => !(userStore.value as Record<string, unknown>)[i]
    );
    return !result;
  });
  const user = computed(() => userStore.value);
  const userFullName = computed(() =>
    userStore.value.surname || userStore.value.name
      ? `${userStore.value.surname} ${userStore.value.name}`
      : userStore.value.nickname
  );

  //actions
  const userGetData: IUserGetDataFunction = async (
    { onlyIfNoData } = { onlyIfNoData: false }
  ) => {
    if (onlyIfNoData && isDataFetched.value) {
      return user;
    }

    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (!!authError || !authData.user) {
      isLoading.value = false;
      return false;
    }
    const currentUserUID = authData.user?.id;

    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .eq('id', currentUserUID)
      .single();

    if (!!error || !data) {
      isLoading.value = false;
      return false;
    }
    userStore.value = {
      ...userStore.value,
      ...data,
    };
    isLoading.value = false;
    isDataFetched.value = true;
  };

  const userSetData = async (formData: IUserStore) => {
    if (!userStore.value.id) {
      return false;
    }
    isLoading.value = true;
    await supabase
      .from('profile')
      .update(formData)
      .eq('id', userStore.value.id);

    Notify.create('Данные профиля изменены!');
    await userGetData();
  };

  const userReset = () => {
    userStore.value = { ...initialUserState }; //{ ...userStore.value, ...initialUserState };
  };

  const userRegister = async ({
    name,
    email,
    password,
  }: RegisterPayloadData) => {
    isLoading.value = true;
    const result = await supabase.auth.signUp({
      email,
      password,
    });
    if (!result.data.user) {
      isLoading.value = false;
      throw new Error('Что-то пошло не так');
    }

    const user = result.data.user;

    const { error } = await supabase
      .from('profile')
      .update({ nickname: name, email })
      .eq('id', user.id);

    if (!!error) {
      isLoading.value = false;
      throw new Error(JSON.stringify(error));
    }

    await userGetData();
    Notify.create(`Добро пожаловать, ${name}!`);
    isLoading.value = false;
  };

  const userLogIn = async ({
    email,
    password,
  }: Omit<RegisterPayloadData, 'name'>) => {
    isLoading.value = true;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      isLoading.value = false;
      throw new Error('Cannot sign in for some reason');
    }
    await userGetData();
  };

  const userLogOut = async () => {
    const name = userFullName.value;
    await supabase.auth.signOut();
    userReset();
    Notify.create(`Пока-пока, ${name}!`);
  };

  return {
    user,
    userFullName,
    isCurrentUserFullfilled,
    isLoading,

    userGetData,
    userSetData,
    userReset,
    userRegister,
    userLogIn,
    userLogOut,
  };
});
