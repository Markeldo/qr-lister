import { useTeamStore } from 'src/entities/team'; // TODO: решить вопрос с импортом из соседней entity. Пока что нет решения.
import { IScopesFunction, ToPayload } from '..';

export const isOwner: IScopesFunction = async (user, payload) => {
  const currentUserUid = user?.id;
  const teamId = (payload as ToPayload)?.to?.params?.teamId || payload;
  if (!teamId || typeof teamId !== 'string' || !currentUserUid) {
    return;
  }
  const store = useTeamStore();

  return {
    IS_OWNER: { [teamId]: store.team.owner === currentUserUid },
  };
};

