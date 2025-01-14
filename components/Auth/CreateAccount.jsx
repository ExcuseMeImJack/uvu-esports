"use client"

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'

function CreateAccount() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const dropdownRef = useRef(null);

  useEffect(() => {
    const checkIfClickedOutside = e => {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setEmail("");
        setPassword("");
        setName("");
      }
    }

    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        password,
      }),
    }).then(async (res) => {
      setLoading(false);
      router.refresh();
      if (res.status === 200) {
        setTimeout(() => {
          signIn("credentials", {
            redirect: false,
            email,
            password
          }).then(({ error }) => {
            if (error) {
              setLoading(false);
              setErrors(error);
            } else {
              router.refresh();
            }
          })
        }, 2000);
      } else {
        const { error } = await res.json();
        setErrors(error)
      }
    });
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    signIn("credentials", {
      redirect: false,
      email: "rauchg@vercel.com",
      password: "tester"
    }).then(({ error }) => {
      if (error) {
        setLoading(false);
        setErrors(error);
      } else {
        router.refresh();
      }
    })
  }

  return (
    <>
      <div className="dropdown" ref={dropdownRef} onClick={() => setIsOpen(true)}>
        <div tabIndex={0} role="button" className="hover:text-gray-400 xl:text-lg lg:text-md m:text-sm sm:text-xs">CREATE ACCOUNT</div>
        <ul tabIndex={0} className='dropdown-content z-[1] menu p-2 shadow bg-[#212022] rounded-box w-72 mt-2 border-2 border-[#DEDEDE]'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
            <li>
              <label className='hover:cursor-default hover:bg-[#212022]'>Email</label>
              <input
                className='hover:cursor-text'
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </li>
            <li>
              <label className='hover:cursor-default hover:bg-[#212022]'>Name</label>
              <input
                className='hover:cursor-text'
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </li>
            <li>
              <label className='hover:cursor-default hover:bg-[#212022]'>Password</label>
              <input
                className='hover:cursor-text'
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </li>
            <li className='flex flex-col gap-3 text-[#DEDEDE] mt-2'>
              <button
                disabled={loading}
                className='flex justify-center p-2 bg-sky-700 hover:bg-sky-800'
                type='submit'>Create Account</button>
              <button
                className='flex justify-center p-2 bg-emerald-700 hover:bg-emerald-800'
                onClick={handleDemoLogin} type='button'>Demo User</button>
            </li>
          </form>
          {errors && (
            <div className=''>
              <p className='text-sm text-red-500'>{errors}</p>
            </div>
          )}
        </ul>
      </div>
    </>
  )
}

export default CreateAccount
