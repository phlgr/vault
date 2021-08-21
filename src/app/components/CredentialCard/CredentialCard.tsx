import React from 'react';
import { Credential } from '../../../types';
import styles from './CredentialCard.module.css';

type CredentialCardProps = {
  credentialData: Credential;
};

export default function CredentialCard({
  credentialData,
}: CredentialCardProps): JSX.Element {
  return (
    <div className={styles.frame}>
      <p>{credentialData.service}</p>
      <p>{credentialData.username}</p>
      <p>{credentialData.password}</p>
    </div>
  );
}
