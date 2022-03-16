import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import CreateList from '../src/components/create-list';
import { initialStore } from '../src/store/hooks/use-task-state';
import styles from '../styles/Home.module.css';

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
