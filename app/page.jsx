'use client';

import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import SignIn from '../components/Auth/SignIn';
import CreateAccount from '../components/Auth/CreateAccount';
import Image from 'next/image';
import { fetchAllUsers, fetchUserByID } from '@/lib/routes/users';

export const dynamic = 'force-dynamic';

export default function Home() {
  const [userID, setUserID] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (userID.length > 5) {
      const getUser = async () => {
        try {
          const user = await fetchUserByID(userID);
          setSearchedUser(user);
        } catch (error) {
          console.error('Error fetching user:', error.message);
          setSearchedUser(null);
        }
      };
      getUser();
    }
  }, [userID]);

  useEffect(() => {
    if (status === 'authenticated') {
      const getAllUsers = async () => {
        try {
          const users = await fetchAllUsers();
          setAllUsers(users);
        } catch (error) {
          console.log('Error fetching users:', error.message);
          setAllUsers(null);
        }
      };
      getAllUsers();
    }
  }, [status])

  if (status === 'loading') return <Loading loader={1} />;

  return (
    <div>
      <div className="flex flex-col gap-8">
        <h1 className="text-center font-bold text-xl">{status.toUpperCase()}</h1>

        {status === 'unauthenticated' && (
          <>
            <SignIn />
            <CreateAccount />
          </>
        )}

        {status === 'authenticated' && (
          <>
            <div className="flex justify-evenly">
              <div className="flex flex-col gap-2 p-4">
                <Image
                  alt="Profile Image"
                  src={session.user.profilePic || '/placeholder.jpg'}
                  width={275}
                  height={275}
                  priority
                  className="rounded-md"
                />
                <p className="text-sm">{session.user.name}</p>
                <p className="text-sm">{session.user.id}</p>
                <p className="text-sm">{session.user.email}</p>
                <p className="text-sm">
                  isAdmin: {session.user.isAdmin ? 'Yes' : 'No'}
                </p>
                <button
                  onClick={() => signOut()}
                  className="w-24 bg-slate-800 text-white p-2 rounded-md hover:bg-slate-700 duration-100"
                >
                  Sign Out
                </button>
              </div>

              <div className="border-2 border-black rounded-md p-2 m-4 w-80">
                <form className="flex flex-col">
                  <label>Search for a User by ID:</label>
                  <input
                    type="text"
                    className="border-2 border-slate-500"
                    value={userID}
                    onChange={(e) => setUserID(e.target.value)}
                  />
                </form>

                {searchedUser ? (
                  <div className="flex flex-col gap-2 p-4">
                    <Image
                      alt="Profile Image"
                      src={searchedUser.profilePic || '/placeholder.jpg'}
                      width={275}
                      height={275}
                      priority
                      className="rounded-md"
                    />
                    <p className="text-sm">{searchedUser.name}</p>
                    <p className="text-sm">{searchedUser.id}</p>
                    <p className="text-sm">{searchedUser.email}</p>
                    <p className="text-sm">
                      isAdmin: {searchedUser.isAdmin ? 'Yes' : 'No'}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm">Search for a user above.</p>
                )}
              </div>
            </div>
            <div>
              <h1 className="text-center font-bold text-xl">All Users</h1>
              <div className='flex justify-evenly gap-2 flex-wrap'>
                {allUsers?.map((user, i) => (
                  <div key={i} className="flex flex-col gap-2 p-2 w-40">
                    <Image
                      alt="Profile Image"
                      src={user.profilePic || '/placeholder.jpg'}
                      width={150}
                      height={150}
                      priority
                      className="rounded-md"
                    />
                    <p className="text-sm">{user.name}</p>
                    <p className="text-sm">{user.id}</p>
                    <p className="text-sm">{user.email}</p>
                    <p className="text-sm">
                      isAdmin: {user.isAdmin ? 'Yes' : 'No'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}


      </div>
    </div>
  );
}
