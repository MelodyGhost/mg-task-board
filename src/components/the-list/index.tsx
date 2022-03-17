import React, { Dispatch, useEffect, useState } from 'react';
import {
  Actions,
  ActionTypes,
  ICard,
  IList,
  ITaskBoardState,
} from '../../store/types';
import ListName from './list-name';
import SingleCard from './single-card';

interface ITheList {
  id: string;
  state: ITaskBoardState;
  dispatch: Dispatch<Actions>;
}

const TheList: React.FC<ITheList> = ({ id, state, dispatch }) => {
  const [cardInput, setCardInput] = useState('');
  const [createCardOpen, setCreateCardOpen] = useState(false);
  const createCard = (cardId: string) => {
    if (!cardInput.trim().length) return;

    dispatch({
      type: ActionTypes.CREATE_CARD,
      payload: { id: cardId, listId: id, title: cardInput },
    });
    setCardInput('');
  };

  return (
    <div className="border-2 rounded-md bg-slate-100 shadow-sm w-60">
      <ListName list={state.lists.byId[id]} dispatch={dispatch} />
      <div className="p-2">
        <div>
          {state.lists.byId[id].cards.map((card) => {
            return (
              <SingleCard
                key={card}
                card={state.cards.byId[card]}
                listId={id}
                dispatch={dispatch}
              />
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
              placeholder="Enter a card title..."
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
    </div>
  );
};

export default TheList;

export const randIdGenerator = () => Math.random().toString(36).slice(2, 8);
