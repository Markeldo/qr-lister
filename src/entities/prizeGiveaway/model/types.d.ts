export type INewPrizeGiveaway = {
  name: string;
  user_id: string;
};

export type IPrizeGiveaway = INewPrizeGiveaway & {
  id: string;
};
