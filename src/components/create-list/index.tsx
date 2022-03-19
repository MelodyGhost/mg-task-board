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
    <div className="p-4 border-2 rounded-md w-60 h-fit">
      {!createListOpen && (
        <button
          className="border px-2 py-1 opacity-75 rounded"
          onClick={() => setCreateListOpen(true)}
        >
          + CreateList
        </button>
      )}
      {createListOpen && (
        <div>
          <input
            type="text"
            className="p-2 mx-1 my-3 border"
            value={input}
            placeholder={'Give your list a name...'}
            autoFocus
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && createList()}
          />
          <div className="flex gap-4">
            <button
              className="border px-2 py-1 bg-slate-800 text-white rounded-md"
              type="submit"
              onClick={createList}
            >
              Save List
            </button>
            <button
              className="border-2 px-2 py-1"
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
