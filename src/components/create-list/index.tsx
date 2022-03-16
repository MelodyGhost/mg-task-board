import React, { useState } from 'react';

const CreateList = () => {
  const [createListOpen, setCreateListOpen] = useState(false);
  const [input, setInput] = useState('');

  const createList = () => {
    console.log('Entered Input Is: ' + input);
    setInput('');
  };

  return (
    <div className="p-4 border-2 rounded-md">
      {!createListOpen && (
        <button
          className="border px-2 py-1"
          onClick={() => setCreateListOpen(true)}
        >
          CreateList
        </button>
      )}
      {createListOpen && (
        <div>
          <input
            type="text"
            className="p-2 border"
            value={input}
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
