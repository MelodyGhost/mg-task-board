import { Dispatch, useEffect, useState, useCallback } from 'react';
import { Actions, ActionTypes, ICard } from '../../../store/types';

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
    dispatch({
      type: ActionTypes.DELETE_CARD,
      payload: { id: card.id, listId },
    });
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('drag started');
    e.dataTransfer.setData(
      'text/plain',
      JSON.stringify({ id: card.id, listId })
    );
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
      className="border p-2 mt-2"
    >
      {editMode && (
        <input
          type="text"
          value={renameInput}
          className="p-1 rounded-sm"
          autoFocus
          onChange={(e) => {
            setRenameInput(e.target.value);
          }}
          onKeyDown={(e) => e.key === 'Enter' && renameCard()}
        />
      )}
      {!editMode && (
        <div
          className={`flex ${
            card.locked ? 'opacity-50' : 'opacity-100 cursor-pointer'
          }`}
        >
          <button onClick={toggleLock} style={{ flex: 0.1, paddingRight: 5 }}>
            {card.locked ? '🔒' : '🔓'}
          </button>
          <div
            style={{ flex: 0.8, userSelect: 'none' }}
            onDoubleClick={() => setEditmode(true)}
          >
            {renameInput}
          </div>
          <button
            className="bg-red-500"
            onClick={deleteCard}
            style={{ flex: 0.1 }}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleCard;
