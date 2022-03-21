import { Dispatch, useEffect, useState, useCallback } from 'react';
import { Actions, ActionTypes, ICard } from '@/store/types';
import { DeleteIcon, LockIcon, UnlockIcon } from 'src/utils/components/icons';

interface ISingleCard {
  card: ICard;
  listId: string;
  dispatch: Dispatch<Actions>;
}
const SingleCard: React.FC<ISingleCard> = ({ card, listId, dispatch }) => {
  const [editMode, setEditmode] = useState(false);
  const [renameInput, setRenameInput] = useState(card.title);

  const renameCard = () => {
    if (!renameInput.trim().length) return;
    dispatch({
      type: ActionTypes.RENAME_CARD,
      payload: { id: card.id, newName: renameInput },
    });
    setEditmode(false);
  };

  const toggleLock = () => {
    dispatch({ type: ActionTypes.TOGGLE_LOCK, payload: card.id });
  };

  const deleteCard = () => {
    if (card.locked) return;
    dispatch({
      type: ActionTypes.DELETE_CARD,
      payload: { id: card.id, listId },
    });
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    (e.target as HTMLDivElement).style.opacity = '0.2';
    e.dataTransfer.setData(
      'text/plain',
      JSON.stringify({ id: card.id, listId })
    );
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.target) {
      (e.target as HTMLDivElement).style.opacity = '1';
    }
  };

  useEffect(() => {
    const cancelEdit = () => setEditmode(false);
    window.addEventListener('focusout', cancelEdit.bind(this));
    return window.removeEventListener('focusout', cancelEdit);
  }, []);

  return (
    <div
      draggable={!card.locked}
      onDragStart={(e) => handleDragStart(e)}
      onDragEnd={handleDragEnd}
      className="rounded p-2 transition-all bg-slate-800"
    >
      {editMode && (
        <input
          type="text"
          value={renameInput}
          className="p-1 rounded-sm w-full bg-slate-200"
          autoFocus
          onChange={(e) => {
            setRenameInput(e.target.value);
          }}
          onKeyDown={(e) => e.key === 'Enter' && renameCard()}
        />
      )}
      {!editMode && (
        <div
          className={`flex text-slate-200 ${
            card.locked ? 'opacity-50' : 'opacity-100 cursor-pointer'
          }`}
        >
          <button
            className="w-4 h-4 object-contain"
            onClick={toggleLock}
            style={{ flex: 0.1, paddingRight: 5 }}
          >
            {card.locked ? <LockIcon /> : <UnlockIcon />}
          </button>
          <div
            className="transition-all"
            style={{ flex: 0.8, userSelect: 'none' }}
            onDoubleClick={() => setEditmode(true)}
          >
            {renameInput}
          </div>
          <button
            className="h-fit bg-slate-500 hover:bg-red-700 scale-75"
            onClick={deleteCard}
            style={{ flex: 0.1, borderRadius: '50%' }}
          >
            <DeleteIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleCard;
