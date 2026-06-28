import { getCredentials } from "@/features/credentials/credentials";
import { CredentialsClient } from "./credentials-client";

export default async function CredentialsPage() {
  const credentials = await getCredentials();
  return <CredentialsClient credentials={credentials as Array<{ id: string; name: string; type: string; createdAt: Date }>} />;
}
