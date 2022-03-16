import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import CreateList from '../src/components/create-list';
import styles from '../styles/Home.module.css';

interface IList {
  id: string;
  listName: string;
  cards: string[];
}

interface IListById {
  [key: string]: IList;
}

interface ICard {
  id: string;
  item: string;
  locked: boolean;
}

interface ICardById {
  [key: string]: ICard;
}

interface ITaskBoardState {
  lists: {
    byId: IListById;
    allIds: string[];
  };
  cards: {
    byId: ICardById;
    allIds: string[];
  };
}

const initialStore: ITaskBoardState = {
  lists: {
    byId: {
      list1: {
        id: 'list1',
        listName: 'list 1',
        cards: ['card1', 'cards2'],
      },
      list2: {
        id: 'list2',
        listName: 'list 2',
        cards: [],
      },
    },
    allIds: ['list1'],
  },
  cards: {
    byId: {
      card1: {
        id: 'card1',
        item: 'someitem',
        locked: false,
      },
      card2: {
        id: 'card2',
        item: 'some other item',
        locked: true,
      },
    },
    allIds: ['card1', 'card2'],
  },
};

const Home: NextPage = () => {
  const [store, setStore] = useState(initialStore);
  return (
    <div className={styles.container}>
      <Head>
        <title>MG Task Board</title>
        <meta name="description" content="Keep tracks of your work" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <CreateList />
    </div>
  );
};

export default Home;
