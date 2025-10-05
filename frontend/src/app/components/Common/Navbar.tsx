<<<<<<< HEAD
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
=======
"use client"

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
>>>>>>> 36c660dcdefb3216eafb97627e6a717e96f9a47a
                        alt='Healthwell logo'
                        priority
                    />
                </div>

<<<<<<< HEAD
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
=======
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
                    <a
                        href="#sign-up"
                        onClick={handleScroll('sign-up')}
                        className='transition-colors duration-300 hover:text-yellow-300'
                    >
                        Sign Up
                    </a>
                    <a
                        href="#login"
                        onClick={handleScroll('login')}
                        className='bg-yellow text-black px-5 py-2 rounded-3xl hover:bg-green-100 transition-all duration-300 ease-out hover:text-gray-700'
                    >
                        Login
                    </a>
>>>>>>> 36c660dcdefb3216eafb97627e6a717e96f9a47a
                </div>
            </div>
        </nav>
    )
}

export default Navbar