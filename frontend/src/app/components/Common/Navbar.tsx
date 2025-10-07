"use client"

import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About Us', id: 'about-us' },
    { label: 'Services', id: 'services' },
    { label: 'Contacts', id: 'contacts' },
]

const Navbar = () => {
    const [active, setActive] = useState<string>('home')

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(e => {
                    if (e.isIntersecting) setActive(e.target.id)
                })
            },
            { root: null, threshold: 0.35 }
        )
        navItems.forEach(n => {
            const el = document.getElementById(n.id)
            if (el) observer.observe(el)
        })
        return () => observer.disconnect()
    }, [])

    const handleScroll = (id: string) => (e: React.MouseEvent) => {
        e.preventDefault()
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    return (
        <nav className='absolute top-0 left-0 w-full px-[7.5rem] py-10 z-100 text-white font-semibold font-inter'>
            <div className='mx-auto px-6 flex items-center justify-between h-16'>
                <div className='flex items-center'>
                    <Image
                        src='/assets/logo.svg'
                        width={180}
                        height={60}
                        alt='Healthwell logo'
                        priority
                    />
                </div>

                <div id='medium2' className='flex gap-10 items-center'>
                    {navItems.map(item => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={handleScroll(item.id)}
                            className={`transition-colors duration-300 text-white hover:text-yellow-300`}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                <div id='medium2' className='flex gap-8 items-center'>
                    <Link
                        href="/auth?mode=register"
                        onClick={handleScroll('sign-up')}
                        className='transition-colors duration-300 hover:text-yellow-300'
                    >
                        Sign Up
                    </Link>
                    <Link
                        href="/auth?mode=login"
                        onClick={handleScroll('login')}
                        className='bg-yellow text-black px-5 py-2 rounded-3xl hover:bg-green-100 transition-all duration-300 ease-out hover:text-gray-700'
                    >
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar