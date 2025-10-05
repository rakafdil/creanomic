"use client"

import { ListWithIcon } from '@/Types/ListWithIcon'
import Image from 'next/image'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const fade = {
    hidden: { opacity: 0, x: 24 },
    show: { opacity: 1, x: 0 }
}

const visionsHow: ListWithIcon[] = [
    {
        iconSrc: '/assets/shop.svg',
        alt: 'store',
        title: 'Akses Pasar Digital',
        desc: 'Menghubungkan produsen lokal secara langsung dengan konsumen melalui platform digital yang transparan.'
    },
    {
        iconSrc: '/assets/trend_white.svg',
        alt: 'trend',
        title: 'Pemberdayaan Berbasis Teknologi',
        desc: 'Menyediakan teknologi dan data untuk membantu mitra kami meningkatkan produktivitas dan pendapatan.'
    },
    {
        iconSrc: '/assets/weight.svg',
        alt: 'weight measurement',
        title: 'Rantai Pasok yang Adil',
        desc: 'Memotong rantai pasok yang panjang untuk memberikan harga yang lebih adil bagi produsen dan konsumen.'
    },
]

const visionsBenefit: ListWithIcon[] = [
    {
        iconSrc: '/assets/shield.svg',
        alt: 'shieldd',
        title: 'Akses Pasar Digital',
        desc: 'Menghubungkan produsen lokal secara langsung dengan konsumen melalui platform digital yang transparan.'
    },
    {
        iconSrc: '/assets/hand_coin.svg',
        alt: 'handing coin',
        title: 'Pemberdayaan Berbasis Teknologi',
        desc: 'Menyediakan teknologi dan data untuk membantu mitra kami meningkatkan produktivitas dan pendapatan.'
    },
    {
        iconSrc: '/assets/leaf.svg',
        alt: 'leaf',
        title: 'Rantai Pasok yang Adil',
        desc: 'Memotong rantai pasok yang panjang untuk memberikan harga yang lebih adil bagi produsen dan konsumen.'
    },
]

const VisionContent: React.FC<ListWithIcon> = ({ iconSrc, alt, title, desc }) => {
    return (
        <>
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ amount: 0.4 }}
                transition={{ type: 'spring', stiffness: 60, damping: 18, mass: 1.1 }}
                className='flex align-middle gap-5'>
                <Image
                    src={iconSrc}
                    width={40}
                    height={40}
                    alt={alt}
                    color='white'
                />
                <div className='flex flex-col'>
                    <span className='font-semibold text-xl'>
                        {title}
                    </span>
                    <span className='text-xs font-medium'>
                        {desc}
                    </span>
                </div>
            </motion.div>
        </>
    )
}
const Vision = () => {
    return (
        <div className='flex flex-col gap-6 py-11'>
            <div className='flex gap-6'>
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ amount: 0.4 }}
                    transition={{ type: 'spring', stiffness: 60, damping: 18, mass: 1.1 }}
                    className="relative flex-1 aspect-[3/2] overflow-hidden rounded-2xl bg-gray-100 px-12 py-5">
                    <Image
                        src="/assets/potong.png"
                        alt='cutting plants'
                        fill
                        className="object-cover"
                    />
                </motion.div>
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ amount: 0.4 }}
                    transition={{ type: 'spring', stiffness: 60, damping: 18, mass: 1.1 }}
                    className="flex flex-col text-white relative flex-1 aspect-[3/2] overflow-hidden rounded-2xl bg-[#1D582E] px-12 py-5 gap-6">
                    <span className='text-3xl font-semibold'>
                        Bagaimana Kami Mendukung Petani & Produsen Lokal
                    </span>
                    {visionsHow.map(v => (
                        <VisionContent
                            key={v.title}
                            title={v.title}
                            desc={v.desc}
                            iconSrc={v.iconSrc}
                            alt={v.alt}
                        />
                    ))}
                </motion.div>
            </div>
            <div className='flex flex-row-reverse gap-6'>
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ amount: 0.4 }}
                    transition={{ type: 'spring', stiffness: 60, damping: 18, mass: 1.1 }}
                    className="relative flex-1 aspect-[3/2] overflow-hidden rounded-2xl bg-gray-100 px-12 py-5">
                    <Image
                        src="/assets/bermain_sayur.png"
                        alt='playing on table'
                        fill
                        className="object-cover"
                    />
                </motion.div>
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ amount: 0.4 }}
                    transition={{ type: 'spring', stiffness: 60, damping: 18, mass: 1.1 }}
                    className="flex flex-col text-black relative flex-1 aspect-[3/2] overflow-hidden rounded-2xl bg-[#D0F348] px-12 py-5 gap-6">
                    <span className='text-3xl font-semibold'>
                        Manfaat Untuk Anda dan Komunitas
                    </span>
                    {visionsBenefit.map(v => (
                        <VisionContent
                            key={v.title}
                            title={v.title}
                            desc={v.desc}
                            iconSrc={v.iconSrc}
                            alt={v.alt}
                        />
                    ))}
                </motion.div>
            </div>
        </div>
    )
}

export default Vision