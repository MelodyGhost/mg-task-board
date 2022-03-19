import { Dispatch, useState } from 'react';
import { Actions, ActionTypes } from '../../../store/types';
import { randIdGenerator } from '../../../utils/idGenerator';

interface IAddCard {
  listId: string;
  dispatch: Dispatch<Actions>;
}
const AddCard: React.FC<IAddCard> = ({ dispatch, listId }) => {
  const [cardInput, setCardInput] = useState('');
  const [createCardOpen, setCreateCardOpen] = useState(false);

  const createCard = (cardId: string) => {
    if (!cardInput.trim().length) return;

    dispatch({
      type: ActionTypes.CREATE_CARD,
      payload: { id: cardId, listId, title: cardInput },
    });
    setCardInput('');
  };

  return (
    <div className="my-3">
      {!createCardOpen && (
        <button
          className="p-1 rounded-sm opacity-70 border"
          onClick={() => {
            setCreateCardOpen(true);
          }}
        >
          + Add Card
        </button>
      )}
      {createCardOpen && (
        <div>
          <textarea
            className="p-2 mx-1 my-3 border"
            value={cardInput}
            placeholder="Enter a card title..."
            autoFocus
            onChange={(e) => setCardInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === 'Enter' && createCard(randIdGenerator())
            }
          />
          <div className="flex gap-4">
            <button
              className="border px-2 py-1 bg-slate-800 text-white rounded-md"
              onClick={() => createCard(randIdGenerator())}
            >
              Add Card
            </button>
            <button
              className="border px-2 py-1"
              onClick={() => setCreateCardOpen(false)}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCard;
