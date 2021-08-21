import React from 'react';
import styles from './Add.module.css';

export default function Add(): JSX.Element {
  return (
    <main className={styles.container}>
      <h1>Vault</h1>

      <form className={styles.container}>
        <input placeholder="Service" type="text" />
        <input placeholder="User Name" type="text" />
        <input placeholder="Password" type="password" />
        <input placeholder="Master Password" type="password" />
        <input type="submit" value="Save Credential" />
      </form>
    </main>
  );
}
