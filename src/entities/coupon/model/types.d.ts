export type INewCoupon = {
  giveaway_id: string;
  sequence_number: number;
};

export type ICoupon = INewCoupon & {
  id: string;
  owner_name: string | null;
  owner_phone: string | null;
  winner: boolean;
  is_registered: boolean;
};

export type ICouponUpdateOwner = Pick<
  ICoupon,
  'id' | 'owner_phone' | 'owner_name'
>;
