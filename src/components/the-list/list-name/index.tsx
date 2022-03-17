import { Dispatch, useState } from 'react';
import { Actions, ActionTypes, IList } from '../../../store/types';

interface IListName {
  list: IList;
  dispatch: Dispatch<Actions>;
}
const ListName: React.FC<IListName> = ({ list, dispatch }) => {
  const [editMode, setEditmode] = useState(false);
  const [renameInput, setRenameInput] = useState(list.listName);

  const renameList = () => {
    if (!renameInput.trim().length) return;
    dispatch({
      type: ActionTypes.RENAME_LIST,
      payload: { id: list.id, newName: renameInput },
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
  return (
    <div className="border-b-2 px-2">
      {editMode && (
        <input
          type="text"
          value={renameInput}
          onChange={(e) => {
            setRenameInput(e.target.value);
          }}
          onKeyDown={(e) => e.key === 'Enter' && renameList()}
        />
      )}
      {!editMode && (
        <div className="flex justify-between">
          <div className="flex-grow" onDoubleClick={() => setEditmode(true)}>
            {renameInput}
          </div>
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
