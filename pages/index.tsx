import type { NextPage } from 'next';
import Head from 'next/head';
import CreateList from '../src/components/create-list';
import TheList from '../src/components/the-list';
import { useTaskState } from '../src/store/hooks/use-task-state';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const { state, dispatch } = useTaskState();

  return (
    <div className={styles.container}>
      <Head>
        <title>MG Task Board</title>
        <meta name="description" content="Keep tracks of your work" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className="mb-16">
        <h1 className="text-center text-slate-400 text-4xl font-bold mb-6">
          MG Task Board
        </h1>
        <p className="text-gray-500 text-center">
          assignedBy <span className="text-orange-700">weDevs</span>
        </p>
      </div>
      <div className="flex gap-3 flex-wrap">
        {state.lists.allIds.map((list) => {
          return <TheList key={list} id={list} {...{ state, dispatch }} />;
        })}
        <CreateList {...{ state, dispatch }} />
      </div>
    </div>
  );
};

export default Home;
