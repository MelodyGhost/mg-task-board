import React, { Dispatch } from 'react';
import { Actions, ActionTypes, ITaskBoardState } from '@/store/types';
import AddCard from './add-card';
import DragPlace from './drag-place';
import ListName from './list-name';
import SingleCard from './single-card';

interface ITheList {
  id: string;
  state: ITaskBoardState;
  dispatch: Dispatch<Actions>;
}

const TheList: React.FC<ITheList> = ({ id, state, dispatch }) => {
  let position: number = state.lists.byId[id].cards.length;
  let lastDrag: HTMLDivElement | undefined;

  const handleDragEnter = (
    ev: React.DragEvent<HTMLDivElement>,
    key: number
  ) => {
    ev.preventDefault();
    // (ev.target as HTMLDivElement).textContent = 'Drop Here';
    (ev.target as HTMLDivElement).style.height = '40px';
    (ev.target as HTMLDivElement).style.opacity = '1';
    position = key;
    lastDrag = ev.target as HTMLDivElement;
  };

  const handleDragLeave = (ev: React.DragEvent) => {
    (ev.target as HTMLDivElement).style.height = '8px';
    (ev.target as HTMLDivElement).style.opacity = '0';
  };

  const handledDragOver = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    if (lastDrag) {
      lastDrag.style.height = '8px';
      lastDrag.style.opacity = '0';
    }

    const stringData = ev.dataTransfer.getData('text/plain');
    const data = JSON.parse(stringData) as { id: string; listId: string };

    dispatch({
      type: ActionTypes.MOVE_CARD,
      payload: { id: data.id, fromList: data.listId, toList: id, position },
    });
  };

  return (
    <div
      className="rounded-md bg-black shadow-md w-72 h-fit shadow-orange-900"
      onDragOver={handledDragOver}
      onDrop={handleDrop}
    >
      <ListName list={state.lists.byId[id]} dispatch={dispatch} />
      <div className="p-2">
        <div>
          {state.lists.byId[id].cards.map((card, index) => {
            return (
              <div key={card} className="transition-all">
                <DragPlace
                  handleDragEnter={(ev) => handleDragEnter(ev, index)}
                  handleDragLeave={handleDragLeave}
                />
                <SingleCard
                  // key={card}
                  card={state.cards.byId[card]}
                  listId={id}
                  dispatch={dispatch}
                />
              </div>
            );
          })}
          <DragPlace
            handleDragEnter={(ev) =>
              handleDragEnter(ev, state.lists.byId[id].cards.length)
            }
            handleDragLeave={handleDragLeave}
          />
        </div>
        <AddCard {...{ listId: id, dispatch }} />
      </div>
    </div>
  );
};

export default TheList;
