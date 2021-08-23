export async function deleteCredential(
  service: string,
  masterPassword: string
): Promise<void> {
  await fetch(`/api/credentials/${service}`, {
    method: 'DELETE',
    headers: { Authorization: masterPassword },
  });
}
