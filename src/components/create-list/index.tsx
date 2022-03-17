import React, { Dispatch, useEffect, useState } from 'react';
import { Actions, ActionTypes, ITaskBoardState } from '../../store/types';
import { randIdGenerator } from '../the-list';

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
    <div className="p-4 border-2 rounded-md w-60">
      {!createListOpen && (
        <button
          className="border px-2 py-1"
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
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && createList()}
          />
          <div className="flex gap-4">
            <button
              className="border px-2 py-1"
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
