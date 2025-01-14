'use client'

import { SessionProvider, getSession, signOut, useSession } from 'next-auth/react';
import Loading from '../components/Loading';
import SignIn from '../components/Auth/SignIn';
import CreateAccount from '../components/Auth/CreateAccount';
import Image from 'next/image';

export const dynamic = 'force-dynamic'

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") return <Loading loader={1} />


  return (
    <div>
      <div className='flex flex-col gap-8'>
        <h1 className='text-center font-bold text-xl'>{status.toUpperCase()}</h1>

      {status === "unauthenticated" && (
        <>
          <SignIn />
          <CreateAccount />
        </>
      )}

        {status === "authenticated" && (
          <div className='flex flex-col gap-2 p-4'>
            <Image
              alt='Profile Image'
              src={session.user.profilePic}
              width={200}
              height={200}
              priority
              className='rounded-md' />
            <p className='text-sm'>{session.user.name}</p>
            <p className='text-sm'>{session.user.id}</p>
            <p className='text-sm'>{session.user.email}</p>
            <p className='text-sm'>isAdmin: {session.user.isAdmin ? 'Yes' : 'No'}</p>
            <button onClick={() => signOut()} className='w-24 bg-slate-800 text-white p-2 rounded-md hover:bg-slate-700 duration-100'>Sign Out</button>
          </div>

        )}
      </div>
    </div>
  )
}
