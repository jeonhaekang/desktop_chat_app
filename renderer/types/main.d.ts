import { TAB_ROOMS, TAB_USERS } from '@/pages/chat';

type TTab = typeof TAB_USERS | typeof TAB_ROOMS;

interface ITab {
  tab: TTab;
  name: string;
}

export { TTab, ITab };
