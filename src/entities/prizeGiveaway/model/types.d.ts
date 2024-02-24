import { GIVEAWAY_STATUSES } from './constants';

export type INewPrizeGiveaway = {
  name: string;
  user_id: string;
};

type GiveawayStatuses =
  (typeof GIVEAWAY_STATUSES)[keyof typeof GIVEAWAY_STATUSES];

export type GiveawayStatusOption = {
  label: string;
  value: GiveawayStatuses;
};

export type IPrizeGiveaway = INewPrizeGiveaway & {
  id: string;
  status: GiveawayStatuses;
  logo?: string;
};
