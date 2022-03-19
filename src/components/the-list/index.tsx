import React, { Dispatch, EventHandler, useRef } from 'react';
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
  const ref = useRef<HTMLDivElement>(null);
  let position: number = state.lists.byId[id].cards.length;
  let lastDrag: HTMLDivElement | undefined;

  const handleDragEnter = (
    ev: React.DragEvent<HTMLDivElement>,
    key: number
  ) => {
    ev.preventDefault();
    // (ev.target as HTMLDivElement).textContent = 'Drop Here';
    (ev.target as HTMLDivElement).style.height = '40px';
    position = key;
    lastDrag = ev.target as HTMLDivElement;
  };

  const handleDragLeave = (ev: React.DragEvent) => {
    (ev.target as HTMLDivElement).style.height = '8px';
  };

  const handledDragOver = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
  };

  const handleDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    if (lastDrag) {
      lastDrag.style.height = '8px';
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
      className="border-2 rounded-md bg-slate-100 shadow-sm w-60 h-fit"
      onDragOver={handledDragOver}
      onDrop={handleDrop}
    >
      <ListName list={state.lists.byId[id]} dispatch={dispatch} />
      <div className="p-2" ref={ref}>
        <div>
          {state.lists.byId[id].cards.map((card, index) => {
            return (
              <div key={card} className="transition-all">
                {/* <div
                  className="opacity-0 h-2 transition-all"
                  onDragEnter={(ev) => handleDragEnter(ev, index)}
                  onDragLeave={handleDragLeave}
                >
                  .
                </div> */}
                <DragPlace
                  handleDragEnter={handleDragEnter}
                  handleDragLeave={handleDragLeave}
                  position={index}
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
            handleDragEnter={handleDragEnter}
            handleDragLeave={handleDragLeave}
            position={state.lists.byId[id].cards.length}
          />
        </div>
        <AddCard {...{ listId: id, dispatch }} />
      </div>
    </div>
  );
};

export default TheList;

interface IDragPlace {
  handleDragEnter: (ev: React.DragEvent<HTMLDivElement>, key: number) => void;
  handleDragLeave: (ev: React.DragEvent) => void;
  position: number;
}
const DragPlace: React.FC<IDragPlace> = ({
  handleDragEnter,
  handleDragLeave,
  position,
}) => {
  return (
    <div
      className="opacity-0 h-2 transition-all"
      onDragEnter={(ev) => handleDragEnter(ev, position)}
      onDragLeave={(e) => handleDragLeave(e)}
    >
      .
    </div>
  );
};
