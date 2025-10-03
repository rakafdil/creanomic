import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        // buat nav full-width tapi isinya dibatasi max-width dan di-center
        <nav className='absolute top-0 left-0 w-full px-[7.5rem] py-10'>
            <div className='mx-auto px-6 flex items-center justify-between h-20'>
                <div className='flex items-center'>
                    <Image
                        src='/assets/logo.svg'
                        width={250}
                        height={40}
                        alt='logo healthwell'
                    />
                </div>

                <div id='medium3' className='flex gap-12 items-center'>
                    <Link href='/'>Home</Link>
                    <Link href='/about-us'>About Us</Link>
                    <Link href='/services'>Services</Link>
                    <Link href='/contacts'>Contacts</Link>
                </div>

                <div id='medium3' className='flex gap-10 items-center'>
                    <Link href='/sign-up'>Sign Up</Link>
                    <Link
                        href='/login'
                        className='bg-yellow text-black px-5 py-2 rounded-3xl hover:bg-green-100 transition-colors duration-300 ease-out'
                    >Login</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar