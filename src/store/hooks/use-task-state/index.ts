import { useReducer } from 'react';
import { Actions, ActionTypes, ITaskBoardState } from '../../types';
import produce from 'immer';

export const initialStore: ITaskBoardState = {
  lists: {
    byId: {
      list1: {
        id: 'list1',
        listName: 'Backlog',
        cards: ['card1', 'card2'],
      },
      list2: {
        id: 'list2',
        listName: 'In Progress',
        cards: ['card3', 'card4'],
      },
    },
    allIds: ['list1', 'list2'],
  },
  cards: {
    byId: {
      card1: {
        id: 'card1',
        title: 'Submit project to weDevs',
        locked: false,
      },
      card2: {
        id: 'card2',
        title: 'Complete Task',
        locked: true,
      },
      card3: {
        id: 'card3',
        title: 'Create Prototype',
        locked: false,
      },
      card4: {
        id: 'card4',
        title: 'Write types and states',
        locked: false,
      },
    },
    allIds: ['card1', 'card2', 'card3', 'card4'],
  },
};

const taskReducer = produce(
  (state: ITaskBoardState, { type, payload }: Actions) => {
    switch (type) {
      case ActionTypes.CREATE_LIST: {
        const { id, listName } = payload;
        state.lists.byId[id] = { id, listName, cards: [] };
        state.lists.allIds.push(id);
        return state;
      }
      case ActionTypes.RENAME_LIST: {
        const { id, newName } = payload;
        state.lists.byId[id].listName = newName;
        return state;
      }
      case ActionTypes.DELETE_LIST: {
        // Delete cards in the list
        state.lists.byId[payload].cards.forEach((card) => {
          delete state.cards.byId[card];
        });
        state.cards.allIds = state.cards.allIds.filter(
          (id) => !state.lists.byId[payload].cards.includes(id)
        );
        // Delete the list itself
        delete state.lists.byId[payload];
        state.lists.allIds = state.lists.allIds.filter((id) => id !== payload);
        return state;
      }
      case ActionTypes.CREATE_CARD: {
        const { id, title, listId } = payload;
        state.cards.byId[id] = { id, title, locked: false };
        state.cards.allIds.push(id);
        state.lists.byId[listId].cards.push(id);
        return state;
      }
      case ActionTypes.RENAME_CARD: {
        const { id, newName } = payload;
        state.cards.byId[id].title = newName;
        return state;
      }
      case ActionTypes.DELETE_CARD: {
        delete state.cards.byId[payload.id];
        state.cards.allIds = state.cards.allIds.filter(
          (id) => id !== payload.id
        );
        state.lists.byId[payload.listId].cards = state.lists.byId[
          payload.listId
        ].cards.filter((card) => card !== payload.id);
        return state;
      }
      case ActionTypes.TOGGLE_LOCK: {
        state.cards.byId[payload].locked = !state.cards.byId[payload].locked;
        return state;
      }
      case ActionTypes.MOVE_CARD: {
        const { id, fromList, toList, position } = payload;
        // Remove from list
        state.lists.byId[fromList].cards = state.lists.byId[
          fromList
        ].cards.filter((card) => card !== id);
        // Add to new list
        state.lists.byId[toList].cards.splice(position, 0, id);
        return state;
      }
      default:
        return state;
    }
  }
);

export const useTaskState = () => {
  const [state, dispatch] = useReducer(taskReducer, initialStore);

  return { state, dispatch };
};
