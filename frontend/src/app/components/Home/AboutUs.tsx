<<<<<<< HEAD
import React from 'react'
import Button from '../Common/Button'
import Image from 'next/image'

const AboutUs = () => {
    return (
        <section className='py-20'>
            <div className='border-b-4 border-[#DEDEDE] mb-10' />
            <div className="flex gap-6 py-1">
                <Button className='bg-lime-300 text-black'>About Us</Button>
                <Button className='border-2 border-[#CDCDCD] text-black'>Vision</Button>
                <Button className='border-2 border-[#CDCDCD] text-black'>Mission</Button>
            </div>
            <div className="flex gap-6.5 py-11">
                <div className="relative min-w-[420px] min-h-[280px] overflow-hidden rounded-2xl bg-gray-100">
=======
"use client"

import React, { useState } from 'react'
import Button from '../Common/Button'
import Image from 'next/image'
import Mission from './Mission'
import Vision from './Vision'
import { AnimatePresence, motion } from 'framer-motion'

const fade = {
    hidden: { opacity: 0, x: 24 },
    show: { opacity: 1, x: 0 }
}

const AboutUscontent: React.FC = () => {
    return (
        <>
            <div className="flex gap-6.5 py-11">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ amount: 0.4 }}
                    transition={{ type: 'spring', stiffness: 60, damping: 18, mass: 1.1 }}
                    className="relative min-w-[420px] min-h-[280px] overflow-hidden rounded-2xl bg-gray-100">
>>>>>>> 36c660dcdefb3216eafb97627e6a717e96f9a47a
                    <Image
                        src="/assets/sawah.jpg"
                        alt="sawah"
                        fill
                        className="object-cover"
                        priority
                    />
<<<<<<< HEAD
                </div>
                <div className='flex flex-col gap-4 justify-center'>
=======
                </motion.div>
                <motion.div
                    variants={fade}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ amount: 0.4 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className='flex flex-col gap-4 justify-center'>
>>>>>>> 36c660dcdefb3216eafb97627e6a717e96f9a47a
                    <p className='text-5xl font-sans font-medium'>
                        Menjembatani Kebaikan dari Ladang ke Meja Makan.
                    </p>
                    <p className='text-2xl font-medium'>
                        Dengan semangat memberdayakan komunitas lokal, kami berkomitmen untuk menghubungkan para petani dan peternak langsung dengan Anda. Bersama, kita wujudkan ekosistem pangan yang lebih sehat dan berkelanjutan untuk Indonesia.
                    </p>
<<<<<<< HEAD
                </div>
            </div>
            <div className='flex w-full gap-6'>
                <div className="relative w-[285px] h-[400px] overflow-hidden rounded-2xl bg-[#E1E1E1]">
=======
                </motion.div>
            </div>
            <div className='flex w-full gap-6'>
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ amount: 0.4 }}
                    transition={{ type: 'spring', stiffness: 60, damping: 18, mass: 1.1 }}
                    className="relative w-[285px] h-[400px] overflow-hidden rounded-2xl bg-[#E1E1E1]">
>>>>>>> 36c660dcdefb3216eafb97627e6a717e96f9a47a
                    <Image
                        src="/assets/petani.jpg"
                        alt="petani"
                        fill
                        className="object-cover object-center"
                    />
<<<<<<< HEAD
                </div>
                <div className="flex-col gap-2 relative w-[285px] h-[400px] overflow-hidden rounded-2xl bg-[#E1E1E1] flex text-left py-5 px-8">
                    <p className="font-bold text-4xl">500+</p>
                    <p className="font-bold text-xl">Mitra Petani & UMKM Lokal</p>
                    <p className='font-medium text-lg'>Kami telah bermitra dengan ratusan petani, peternak, dan UMKM pangan lokal, memberikan mereka platform yang adil dan transparan untuk bertumbuh dan sejahtera.</p>
                </div>
                <div className="relative w-[285px] h-[400px] overflow-hidden rounded-2xl bg-[#E1E1E1]">
=======
                </motion.div>
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 60, damping: 18, mass: 1.1 }}
                    className="flex-col gap-2 relative w-[285px] h-[400px] overflow-hidden rounded-2xl bg-[#E1E1E1] flex text-left py-5 px-8">
                    <p className="font-bold text-4xl">500+</p>
                    <p className="font-bold text-xl">Mitra Petani & UMKM Lokal</p>
                    <p className='font-medium text-lg'>Kami telah bermitra dengan ratusan petani, peternak, dan UMKM pangan lokal, memberikan mereka platform yang adil dan transparan untuk bertumbuh dan sejahtera.</p>
                </motion.div>
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ amount: 0.4 }}
                    transition={{ type: 'spring', stiffness: 60, damping: 18, mass: 1.1 }}
                    className="relative w-[285px] h-[400px] overflow-hidden rounded-2xl bg-[#E1E1E1]">
>>>>>>> 36c660dcdefb3216eafb97627e6a717e96f9a47a
                    <Image
                        src="/assets/tomat.jpg"
                        alt="tomat"
                        fill
                        className="object-cover object-center"
                    />
<<<<<<< HEAD
                </div>
                <div className="flex-col gap-2 relative w-[285px] h-[400px] overflow-hidden rounded-2xl bg-[#D0F348] flex text-left py-5 px-8">
                    <p className="font-bold text-4xl">95%</p>
                    <p className="font-bold text-xl">Tingkat Kesegaran Produk</p>
                    <p className='font-medium text-lg'>Kami memastikan produk yang sampai ke tangan Anda memiliki kualitas terbaik. Pengguna mempercayai kami untuk menghadirkan hasil bumi segar langsung dari sumbernya.</p>
                </div>
            </div>
=======
                </motion.div>
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    whileInView={{ y: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 60, damping: 18, mass: 1.1 }}
                    className="flex-col gap-2 relative w-[285px] h-[400px] overflow-hidden rounded-2xl bg-[#D0F348] flex text-left py-5 px-8">
                    <p className="font-bold text-4xl">95%</p>
                    <p className="font-bold text-xl">Tingkat Kesegaran Produk</p>
                    <p className='font-medium text-lg'>Kami memastikan produk yang sampai ke tangan Anda memiliki kualitas terbaik. Pengguna mempercayai kami untuk menghadirkan hasil bumi segar langsung dari sumbernya.</p>
                </motion.div>
            </div>
        </>
    )
}
const AboutUs = () => {
    const [linkIndex, setLinkIndex] = useState(0)

    const tabs = [
        { label: 'About Us', idx: 0 },
        { label: 'Vision', idx: 1 },
        { label: 'Mission', idx: 2 }
    ]

    const baseBtn = 'text-black font-medium'
    const activeBtn = 'bg-lime-300 border border-lime-300'
    const inactiveBtn = 'border-2 border-[#CDCDCD] bg-white hover:bg-[#F4F4F4]'

    return (
        <section className='py-20'>
            <div className='border-b-4 border-[#DEDEDE] mb-10' />
            <div className="flex gap-6 py-1">
                {tabs.map(t => (
                    <Button
                        key={t.idx}
                        onClick={() => setLinkIndex(t.idx)}
                        className={`${baseBtn} ${linkIndex === t.idx ? activeBtn : inactiveBtn}`}
                        aria-pressed={linkIndex === t.idx}
                    >
                        {t.label}
                    </Button>
                ))}
            </div>
            {
                linkIndex === 0 ? <AboutUscontent /> :
                    linkIndex === 1 ? <Vision /> :
                        <Mission />
            }

>>>>>>> 36c660dcdefb3216eafb97627e6a717e96f9a47a
        </section>
    )
}

export default AboutUs