import { useState } from 'react';
import Styles from './Style.module.css';
export const CrossIcon = () => {
  const [fill, setFill] = useState('rgb(100, 116, 139)');
  return (
    <svg
      style={{ width: '24px', height: '24px' }}
      className={Styles.crossIcon}
      viewBox="0 0 24 24"
      onMouseEnter={() => setFill('rgb(226,232,240)')}
      onMouseLeave={() => setFill('rgb(100, 116, 139)')}
    >
      <path
        fill={fill}
        d="M9,7H11L12,9.5L13,7H15L13,12L15,17H13L12,14.5L11,17H9L11,12L9,7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z"
      />
    </svg>
  );
};

export const DeleteIcon = () => {
  return (
    <svg style={{ width: '24px', height: '24px' }} viewBox="-4 -4 30 30">
      <path
        // fill="rgb(100, 116, 139)"
        d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"
      />
    </svg>
  );
};

export const LockIcon = () => {
  return (
    <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 28 28">
      <path
        fill="rgb(100, 116, 139)"
        d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"
      />
    </svg>
  );
};

export const UnlockIcon = () => {
  return (
    <svg style={{ width: '24px', height: '24px' }} viewBox="0 0 28 28">
      <path
        fill="rgb(21,128,61)"
        d="M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6C4.89,22 4,21.1 4,20V10A2,2 0 0,1 6,8H15V6A3,3 0 0,0 12,3A3,3 0 0,0 9,6H7A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,17A2,2 0 0,0 14,15A2,2 0 0,0 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17Z"
      />
    </svg>
  );
};
