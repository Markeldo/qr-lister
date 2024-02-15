export const GIVEAWAY_STATUSES = {
  ACTIVE: 'active',
  REGISTRATION_CLOSED: 'registration_closed',
  FINISHED: 'finished',
} as const;

const GIVEAWAY_STATUS_NAMES = {
  [GIVEAWAY_STATUSES.ACTIVE]: 'Активный',
  [GIVEAWAY_STATUSES.REGISTRATION_CLOSED]: 'Регистрация завершена',
  [GIVEAWAY_STATUSES.FINISHED]: 'Завершённый',
};

export const GIVEAWAY_STATUS_OPTIONS = Object.values(GIVEAWAY_STATUSES).map(
  (status) => ({
    label: GIVEAWAY_STATUS_NAMES[status],
    value: status,
  })
);
