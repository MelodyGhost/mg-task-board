export interface IList {
  id: string;
  listName: string;
  cards: string[];
}

interface IListById {
  [key: string]: IList;
}

interface ICard {
  id: string;
  title: string;
  locked: boolean;
}

interface ICardById {
  [key: string]: ICard;
}

export interface ITaskBoardState {
  lists: {
    byId: IListById;
    allIds: string[];
  };
  cards: {
    byId: ICardById;
    allIds: string[];
  };
}

export enum ActionTypes {
  CREATE_LIST = 'create-list',
  RENAME_LIST = 'rename-list',
  DELETE_LIST = 'delete-list',
  CREATE_CARD = 'create-card',
  RENAME_CARD = 'rename-card',
  DELETE_CARD = 'delete-card',
  TOGGLE_LOCK = 'toggle-lock',
  MOVE_CARD = 'move-card',
}

export interface CreateListAction {
  type: ActionTypes.CREATE_LIST;
  payload: { id: string; listName: string };
}

export interface RenameListAction {
  type: ActionTypes.RENAME_LIST;
  payload: { id: string; newName: string };
}

export interface DeleteListAction {
  type: ActionTypes.DELETE_LIST;
  payload: string;
}

export interface CreateCardAction {
  type: ActionTypes.CREATE_CARD;
  payload: { id: string; title: string; listId: string };
}

export interface RenameCardAction {
  type: ActionTypes.RENAME_CARD;
  payload: { id: string; newName: string };
}

export interface DeleteCardAction {
  type: ActionTypes.DELETE_CARD;
  payload: string;
}

export interface ToggleLockAction {
  type: ActionTypes.TOGGLE_LOCK;
  payload: string;
}

export interface MoveCardAction {
  type: ActionTypes.MOVE_CARD;
  payload: { id: string; fromList: string; toList: string };
}

export type Actions =
  | CreateListAction
  | RenameListAction
  | DeleteListAction
  | CreateCardAction
  | RenameCardAction
  | DeleteCardAction
  | ToggleLockAction
  | MoveCardAction;
