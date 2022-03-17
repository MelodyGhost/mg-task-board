import React, { Dispatch, useEffect, useState } from 'react';
import {
  Actions,
  ActionTypes,
  IList,
  ITaskBoardState,
} from '../../store/types';

interface ITheList {
  id: string;
  state: ITaskBoardState;
  dispatch: Dispatch<Actions>;
}

const TheList: React.FC<ITheList> = ({ id, state, dispatch }) => {
  const [cardInput, setCardInput] = useState('');
  const [createCardOpen, setCreateCardOpen] = useState(false);
  const createCard = (cardId: string) => {
    console.log('clicked');
    dispatch({
      type: ActionTypes.CREATE_CARD,
      payload: { id: cardId, listId: id, title: cardInput },
    });
    setCardInput('');
  };

  return (
    <div className="p-4 border-2 rounded-md">
      {/* <div
        className="border-b-2"
        onDoubleClick={() => console.log('double clicked 😀')}
      >
        {state.lists.byId[id].listName}
      </div> */}
      <ListName list={state.lists.byId[id]} dispatch={dispatch} />
      <div>
        {state.lists.byId[id].cards.map((card) => {
          return (
            <p key={card} draggable>
              {state.cards.byId[card].title}
            </p>
          );
        })}
      </div>
      {!createCardOpen && (
        <button onClick={() => setCreateCardOpen(true)}>+ Add Card</button>
      )}
      {createCardOpen && (
        <div>
          <input
            type="text"
            className="p-2 mx-1 my-3 border"
            value={cardInput}
            onChange={(e) => setCardInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === 'Enter' && createCard(randIdGenerator())
            }
          />
          <div className="flex gap-4">
            <button
              className="border px-2 py-1"
              onClick={() => createCard(randIdGenerator())}
            >
              Add Card
            </button>
            <button
              className="border px-2 py-1"
              onClick={() => setCreateCardOpen(false)}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheList;

interface IListName {
  list: IList;
  dispatch: Dispatch<Actions>;
}
const ListName: React.FC<IListName> = ({ list, dispatch }) => {
  const [editMode, setEditmode] = useState(false);
  const [renameInput, setRenameInput] = useState(list.listName);

  const renameList = () => {
    dispatch({
      type: ActionTypes.RENAME_LIST,
      payload: { id: list.id, newName: renameInput },
    });
    setEditmode(false);
  };
  return (
    <div className="border-b-2">
      {editMode && (
        <input
          type="text"
          value={renameInput}
          onChange={(e) => {
            setRenameInput(e.target.value);
          }}
          onKeyDown={(e) => e.key === 'Enter' && renameList()}
        />
      )}
      {!editMode && (
        <div onDoubleClick={() => setEditmode(true)}>{renameInput}</div>
      )}
    </div>
  );
};

export const randIdGenerator = () => Math.random().toString(36).slice(2, 8);
