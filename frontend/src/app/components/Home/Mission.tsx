"use client"

import Image from 'next/image'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const missions = [
    {
        title: "Kurasi Mitra Lokal",
        desc: "Bermitra langsung dengan petani & UMKM pilihan."
    },
    {
        title: "Pengawasan Kualitas Ketat",
        desc: "Memastikan setiap produk memenuhi standar kesegaran tertinggi."
    },
    {
        title: "Platform Digital Terintegrasi",
        desc: "Teknologi yang memudahkan pemesanan dan transparansi."
    },
    {
        title: "Pengiriman Rendah Karbon",
        desc: "Rute efisien dan kemasan ramah lingkungan."
    },
]

const MissionContent: React.FC<{ title: string; desc: string }> = ({ title, desc }) => {
    return (
        <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ amount: 0.4 }}
            transition={{ type: 'spring', stiffness: 60, damping: 18, mass: 1.1 }}>
            <div className="flex flex-col gap-1 pb-3 border-b-3 border-white">
                <span className="text-lg sm:text-xl lg:text-2xl">{title}</span>
                <span className="text-sm sm:text-base">
                    {desc}
                </span>
            </div>
        </motion.div>
    )
}

const Mission = () => {
    return (
        <div className='flex flex-col gap-4 sm:gap-6 py-6 sm:py-11'>
            <div className='flex flex-col md:flex-row gap-4 sm:gap-6'>
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ amount: 0.4 }}
                    transition={{ type: 'spring', stiffness: 60, damping: 18, mass: 1.1 }}
                    className="relative flex-1 aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 px-6 py-4 sm:px-12 sm:py-5">
                    <Image
                        src="/assets/laugh_together_to_veggies.png"
                        alt='laughing to veggies'
                        fill
                        className="object-cover"
                    />
                </motion.div>
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ amount: 0.4 }}
                    transition={{ type: 'spring', stiffness: 60, damping: 18, mass: 1.1 }}
                    className="flex flex-col text-white relative flex-1 aspect-[3/4] overflow-hidden rounded-2xl bg-[#1D582E] p-6 sm:p-8 lg:p-12 gap-4 sm:gap-6 lg:gap-8 font-semibold">
                    <span className='text-2xl sm:text-3xl lg:text-4xl'>
                        Misi Kami dalam Aksi
                    </span>
                    <span className='text-base sm:text-lg lg:text-xl'>
                        Misi kami adalah aksi nyata. Kami membangun jembatan yang adil dan transparan dari produsen lokal langsung ke meja Anda melalui pilar-pilar utama berikut.
                    </span>
                    <div className="px-4 sm:px-6 lg:px-10">
                        <div>
                            <ul className="list-disc space-y-4 sm:space-y-6 lg:space-y-8">
                                {missions.map(m => (
                                    <MissionContent
                                        key={m.title}
                                        title={m.title}
                                        desc={m.desc}
                                    />
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Mission