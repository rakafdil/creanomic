import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Services', href: '/services' },
    { label: 'Contacts', href: '/contacts' },
]

const Navbar = () => {
    return (
        <nav className='absolute top-0 left-0 w-full px-[7.5rem] py-10 z-100 text-white'>
            <div className='mx-auto px-6 flex items-center justify-between h-20'>
                <div className='flex items-center'>
                    <Image
                        src='/assets/logo.svg'
                        width={250}
                        height={80}
                        alt='Healthwell logo'
                        priority
                    />
                </div>

                <div id='medium2' className='flex gap-12 items-center'>
                    {navItems.map(item => (
                        <Link key={item.href} href={item.href} className='navLink transition-colors duration-300 hover:text-yellow-300'>
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div id='medium2' className='flex gap-10 items-center'>
                    <Link href='/sign-up' className='navLink transition-colors duration-300 hover:text-yellow-300'>
                        Sign Up
                    </Link>
                    <Link
                        href='/login'
                        className='bg-yellow text-black px-5 py-2 rounded-3xl hover:bg-green-100 transition-all duration-300 ease-out hover:text-gray-400'
                    >
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar