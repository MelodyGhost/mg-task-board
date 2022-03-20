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
          className="py-1 px-2 rounded-sm opacity-70 bg-slate-500 text-slate-100"
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
            className="p-2 mx-1 my-3 border w-full"
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
              className="px-2 py-1 bg-blue-600 text-white rounded-md"
              onClick={() => createCard(randIdGenerator())}
            >
              Add Card
            </button>
            <button
              className="px-2 py-1 text-gray-300"
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
