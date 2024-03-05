import {
  hasEmptyProfile,
  isGiveawayActive,
  isGiveawayPrepared,
  isLoggedIn,
} from '../lib';
import { IAllScopesFunctions } from '.';

export const allScopesFunctions: IAllScopesFunctions = {
  IS_NOT_LOGGED_IN: isLoggedIn,
  IS_LOGGED_IN: isLoggedIn,
  HAS_EMPTY_PROFILE: hasEmptyProfile,
  UNREACHABLE_ROUTE: async () => ({
    UNREACHABLE_ROUTE: false,
  }),
  IS_GIVEAWAY_ACTIVE: isGiveawayActive,
  IS_GIVEAWAY_PREPARED: isGiveawayPrepared,
};
