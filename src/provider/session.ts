export async function getSession() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

    return session;
}