import { useUserStore } from 'src/entities/user';
import { IScopesFunction, ToPayload } from '..';

export const canViewTeam: IScopesFunction = async (user, payload) => {
  const id = (payload as ToPayload)?.to.params.teamId as string;
  const currentUserUid = user?.id;
  if (!id || !currentUserUid) {
    return;
  }
  const store = useUserStore();
  const isInTeam = store.usersTeams.some((item) => item.id === id);

  return {
    CAN_VIEW_TEAM: { [id]: isInTeam },
  };
};

