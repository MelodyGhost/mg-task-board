import { Dispatch, useEffect, useState } from 'react';
import { Actions, ActionTypes, IList } from '../../../store/types';

interface IListName {
  list: IList;
  dispatch: Dispatch<Actions>;
}
const ListName: React.FC<IListName> = ({ list, dispatch }) => {
  const [editMode, setEditmode] = useState(false);
  const [textInput, setTextInput] = useState(list.listName);

  const renameList = () => {
    if (!textInput.trim().length) return;
    dispatch({
      type: ActionTypes.RENAME_LIST,
      payload: { id: list.id, newName: textInput },
    });
    setEditmode(false);
  };

  const deleteList = () => {
    const confirm = window.confirm(
      'Are you sure you want to delete this? \nAll cards in the list will be deleted too'
    );
    if (confirm) {
      dispatch({ type: ActionTypes.DELETE_LIST, payload: list.id });
    }
  };

  useEffect(() => {
    window.addEventListener('focusout', renameList.bind(this));
    return window.removeEventListener('focusout', renameList);
  }, []);

  return (
    <div className="border-b-2 px-2">
      {editMode && (
        <input
          type="text"
          value={textInput}
          autoFocus
          className="p-1 rounded-sm"
          onChange={(e) => {
            setTextInput(e.target.value);
          }}
          onKeyDown={(e) => e.key === 'Enter' && renameList()}
        />
      )}
      {!editMode && (
        <div className="flex justify-between">
          <strong
            className="flex-grow opacity-75"
            onDoubleClick={() => setEditmode(true)}
          >
            {textInput}
          </strong>
          <button
            className="border px-2 text-red-600"
            style={{ flex: 0.2 }}
            onClick={deleteList}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default ListName;
