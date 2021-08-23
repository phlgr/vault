import { Credential } from '../../types';

export async function deleteCredential(
  service: string,
  masterPassword: string
): Promise<void> {
  await fetch(`/api/credentials/${service}`, {
    method: 'DELETE',
    headers: { Authorization: masterPassword },
  });
}

export async function updateCredential(
  credential: Credential,
  masterPassword: string
): Promise<Response> {
  const response = await fetch(`/api/credentials/${credential.service}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: masterPassword,
    },
    body: JSON.stringify(credential),
  });
  return response;
}

export async function fetchCredential(
  service: string,
  masterPassword: string
): Promise<Response> {
  const response = fetch(`/api/credentials/${service}`, {
    headers: { Authorization: masterPassword },
  });
  return response;
}
