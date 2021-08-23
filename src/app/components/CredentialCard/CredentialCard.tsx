import React, { useState } from 'react';
import { Credential } from '../../../types';
import styles from './CredentialCard.module.css';

type CredentialCardProps = {
  credentialData: Credential;
  onDeleteClick: (service: string) => Promise<void>;
  onEditClick: (credential: Credential) => Promise<void>;
};

export default function CredentialCard({
  credentialData,
  onDeleteClick,
  onEditClick,
}: CredentialCardProps): JSX.Element {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [service, setService] = useState<string>(credentialData.service);
  const [username, setUsername] = useState<string>(credentialData.username);
  const [password, setPassword] = useState<string>(credentialData.password);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const credential = {
      service,
      username,
      password,
    };
    await onEditClick(credential);
    setIsEditMode(false);
  }

  return (
    <div className={styles.frame}>
      {isEditMode ? (
        <form onSubmit={(event) => handleSubmit(event)}>
          <input
            type="text"
            placeholder="Service"
            value={service}
            onChange={(event) => setService(event.target.value)}
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <input type="submit" value="✏" />
        </form>
      ) : (
        <>
          <p>{credentialData.service}</p>
          <p>{credentialData.username}</p>
          <p>{credentialData.password}</p>
          <button onClick={() => onDeleteClick(credentialData.service)}>
            🗑
          </button>
        </>
      )}
      <button onClick={() => setIsEditMode(!isEditMode)}>
        {isEditMode ? '❌' : '✏'}
      </button>
    </div>
  );
}
