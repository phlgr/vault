import React from 'react';
import { Credential } from '../../../types';
import styles from './CredentialCard.module.css';

type CredentialCardProps = {
  credentialData: Credential;
  onDeleteClick: (service: string) => void;
};

export default function CredentialCard({
  credentialData,
  onDeleteClick,
}: CredentialCardProps): JSX.Element {
  return (
    <div className={styles.frame}>
      <p>{credentialData.service}</p>
      <p>{credentialData.username}</p>
      <p>{credentialData.password}</p>
      <button onClick={() => onDeleteClick(credentialData.service)}>❌</button>
    </div>
  );
}
