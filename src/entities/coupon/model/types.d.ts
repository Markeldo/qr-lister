export type INewCoupon = {
  giveaway_id: string;
  sequence_number: number;
};

export type ICoupon = INewCoupon & {
  id: string;
  registered_on: string;
};
