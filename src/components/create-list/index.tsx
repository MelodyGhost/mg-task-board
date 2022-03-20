import React, { Dispatch, useEffect, useState } from 'react';
import { Actions, ActionTypes, ITaskBoardState } from '../../store/types';
import { randIdGenerator } from '../../utils/idGenerator';

interface ICreateList {
  state: ITaskBoardState;
  dispatch: Dispatch<Actions>;
}

const CreateList: React.FC<ICreateList> = ({ state, dispatch }) => {
  const [createListOpen, setCreateListOpen] = useState(false);
  const [input, setInput] = useState('');

  const createList = () => {
    if (!input.trim().length) return;
    dispatch({
      type: ActionTypes.CREATE_LIST,
      payload: { id: randIdGenerator(), listName: input },
    });
    setInput('');
  };

  return (
    <div className="p-3 bg-slate-900 rounded-md w-72 h-fit" draggable={false}>
      {!createListOpen && (
        <button
          className="px-2 py-1 opacity-75 rounded mx-auto bg-slate-600 text-slate-200 w-full"
          onClick={() => setCreateListOpen(true)}
        >
          + Create New List
        </button>
      )}
      {createListOpen && (
        <div>
          <input
            type="text"
            className="p-2 mx-1 my-3 rounded-sm w-full"
            value={input}
            placeholder={'Give your list a name...'}
            autoFocus
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && createList()}
          />
          <div className="flex gap-4">
            <button
              className="px-2 py-1 bg-green-700 text-white rounded-md"
              type="submit"
              onClick={createList}
            >
              Add List
            </button>
            <button
              className="text-slate-200 px-2 py-1"
              onClick={() => setCreateListOpen(false)}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateList;
