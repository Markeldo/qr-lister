import { useUserStore } from 'src/entities/user';
import { IScopesFunction, ToPayload } from '..';

export const canManageTeam: IScopesFunction = async (user, payload) => {
  const currentUserUid = user?.id;
  const teamId = (payload as ToPayload)?.to?.params?.teamId || payload;
  if (!teamId || typeof teamId !== 'string' || !currentUserUid) {
    return;
  }
  const store = useUserStore();
  const isInTeam = store.managerOfTeams.some((item) => item.id === teamId);

  return {
    CAN_MANAGE_TEAM: { [teamId]: isInTeam },
  };
};

