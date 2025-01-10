'use client'

import { SessionProvider, getSession, useSession } from 'next-auth/react';
import Loading from '../components/Loading';
import SignIn from '../components/Auth/SignIn';
import CreateAccount from '../components/Auth/CreateAccount';

export const dynamic = 'force-dynamic'

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") return <Loading loader={1} />

  return (
    <div>
      {status}
      {session}

      {status === "unauthenticated" && (
        <>
          <SignIn />
          <CreateAccount />
        </>
      )}

    </div>
  )
}
