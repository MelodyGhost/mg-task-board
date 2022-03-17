import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState, createContext } from 'react';
import CreateList from '../src/components/create-list';
import TheList from '../src/components/the-list';
import { initialStore, useTaskState } from '../src/store/hooks/use-task-state';
import styles from '../styles/Home.module.css';

// import StateProvider = createContext()

const Home: NextPage = () => {
  const { state, dispatch } = useTaskState();

  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <div className={styles.container}>
      <Head>
        <title>MG Task Board</title>
        <meta name="description" content="Keep tracks of your work" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="flex gap-3">
        {state.lists.allIds.map((list) => {
          return <TheList key={list} id={list} {...{ state, dispatch }} />;
        })}
        <CreateList {...{ state, dispatch }} />
      </div>
    </div>
  );
};

export default Home;
