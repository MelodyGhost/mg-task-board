import { Dispatch, useState } from 'react';
import { Actions, ActionTypes, ICard } from '../../../store/types';

interface ISingleCard {
  card: ICard;
  listId: string;
  dispatch: Dispatch<Actions>;
}
const SingleCard: React.FC<ISingleCard> = ({ card, listId, dispatch }) => {
  const [editMode, setEditmode] = useState(false);
  const [renameInput, setRenameInput] = useState(card.title);

  const renameList = () => {
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
  return (
    <div draggable={!card.locked} className="border p-2 mt-2">
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
        <div className="flex">
          <button onClick={toggleLock} style={{ flex: 0.1, paddingRight: 5 }}>
            {card.locked ? '🔒' : '🔓'}
          </button>
          <div style={{ flex: 0.8 }} onDoubleClick={() => setEditmode(true)}>
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
