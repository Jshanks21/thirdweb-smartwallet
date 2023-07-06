'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAddress, ConnectWallet, useDisconnect } from "@thirdweb-dev/react";

// Replace the Image with new logo

const Nav = () => {
  const address = useAddress()
  const router = useRouter()
  const disconnect = useDisconnect()
  const [toggleDropdown, setToggleDropdown] = useState(false)

  const signout = () => {
    disconnect()
    router.push('/')
  }

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex flex-center gap-2'>
        <Image
          src='/images/logo.svg'
          alt='Placeholder Logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Dakan</p>
      </Link>      

      <div className='flex relative'>
        {!address ? (
          <div className='flex gap-3 md:gap-5'>
            <ConnectWallet
              btnTitle='Login'
              modalTitle='Login to Dakan'
            />
          </div>
        ) : (
          <div className='flex'>
            <Image
              src='https://avatars.githubusercontent.com/u/56230044?s=400&u=fa8eeec2a56e042b8fc6be921cf2522a56ba75e5&v=4'
              alt='Profile Picture'
              width={37}
              height={37}
              className='rounded-full cursor-pointer'
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href={`/profile/${address}`}
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>                
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false)
                    signout()
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Nav