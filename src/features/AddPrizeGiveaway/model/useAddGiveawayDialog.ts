import { ref } from 'vue';

const isDialogOpen = ref<boolean>(false);

export const useAddGiveawayDialog = () => {
  return isDialogOpen;
};
