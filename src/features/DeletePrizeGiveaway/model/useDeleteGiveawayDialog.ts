import { ref } from 'vue';

const isDialogOpen = ref<boolean>(false);
const selectedGiveawayId = ref<string>();

export const useDeleteGiveawayDialog = () => {
  return { isDialogOpen, selectedGiveawayId };
};
