import React, { Dispatch } from 'react';
import { Actions, ActionTypes, ITaskBoardState } from '../../store/types';
import AddCard from './add-card';
import ListName from './list-name';
import SingleCard from './single-card';

interface ITheList {
  id: string;
  state: ITaskBoardState;
  dispatch: Dispatch<Actions>;
}

const TheList: React.FC<ITheList> = ({ id, state, dispatch }) => {
  const handledDragOver = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
  };

  const handleDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    const stringData = ev.dataTransfer.getData('text/plain');
    const data = JSON.parse(stringData) as { id: string; listId: string };

    if (data.listId === id) return;

    dispatch({
      type: ActionTypes.MOVE_CARD,
      payload: { id: data.id, fromList: data.listId, toList: id },
    });
  };

  return (
    <div
      className="border-2 rounded-md bg-slate-100 shadow-sm w-60"
      onDragOver={handledDragOver}
      onDrop={handleDrop}
    >
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
        <AddCard {...{ listId: id, dispatch }} />
      </div>
    </div>
  );
};

export default TheList;
