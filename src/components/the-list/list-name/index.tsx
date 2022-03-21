import { Dispatch, useEffect, useState } from 'react';
import { Actions, ActionTypes, IList } from '@/store/types';
import { CrossIcon } from 'src/utils/components/icons';

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
    const cancelEdit = () => setEditmode(false);
    window.addEventListener('focusout', cancelEdit.bind(this));
    return window.removeEventListener('focusout', cancelEdit);
  }, []);

  return (
    <div className="px-3 py-1">
      {editMode && (
        <input
          type="text"
          value={textInput}
          autoFocus
          className="p-1 rounded-sm bg-slate-200"
          onChange={(e) => {
            setTextInput(e.target.value);
          }}
          onKeyDown={(e) => e.key === 'Enter' && renameList()}
        />
      )}
      {!editMode && (
        <div className="flex justify-between items-center text-slate-200 tracking-wide w-full">
          <strong
            className="flex-grow text-ellipsis overflow-hidden whitespace-nowrap"
            onDoubleClick={() => setEditmode(true)}
          >
            {textInput}
          </strong>
          <button
            className="p-1 -mr-5 text-red-700"
            style={{ flex: 0.2 }}
            onClick={deleteList}
          >
            <CrossIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default ListName;
