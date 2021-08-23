import React from 'react';
import styles from './Search.module.css';

export default function Search(): JSX.Element {
  return (
    <main className={styles.container}>
      <h1>Vault</h1>
      <form className={styles.container}>
        <input type="text" placeholder="Service" />
        <input type="text" placeholder="Master Password" />
        <input type="submit" value="Submit" />
      </form>
    </main>
  );
}
