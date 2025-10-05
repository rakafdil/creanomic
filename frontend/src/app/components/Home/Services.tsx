<<<<<<< HEAD
import Image from 'next/image'
import React from 'react'

type Service = {
    iconSrc: string
    alt: string
    title: string
    desc: string
}

const services: Service[] = [
=======
"use client"

import { ListWithIcon } from '@/Types/ListWithIcon'
import Image from 'next/image'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'


const services: ListWithIcon[] = [
>>>>>>> 36c660dcdefb3216eafb97627e6a717e96f9a47a
    {
        iconSrc: '/assets/basket.svg',
        alt: 'basket',
        title: 'Marketplace Produk Segar',
        desc: 'Jelajahi beragam hasil tani dan ternak berkualitas langsung dari petani lokal. Belanja mudah, transparan, dan mendukung ekonomi daerah.'
    },
    {
        iconSrc: '/assets/trend.svg',
        alt: 'trend',
        title: 'Platform untuk Mitra Petani',
        desc: 'Dashboard digital bagi petani & peternak untuk mengelola produk, memantau penjualan, dan menjangkau pasar yang lebih luas secara adil.'
    },
    {
        iconSrc: '/assets/book.svg',
        alt: 'book',
        title: 'Edukasi & Kampanye Gizi',
        desc: 'Akses artikel, tips, dan resep sehat untuk memaksimalkan manfaat dari pangan lokal dan mendukung gaya hidup sehat Anda.'
    }
]

<<<<<<< HEAD
const ServiceItem: React.FC<Service> = ({ iconSrc, alt, title, desc }) => (
    <div className='flex gap-9'>
=======
const ServiceItem: React.FC<ListWithIcon> = ({ iconSrc, alt, title, desc }) => (
    <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ amount: 0.4 }}
        transition={{ type: 'spring', stiffness: 60, damping: 18, mass: 1.1 }}
        className='flex gap-9'>
>>>>>>> 36c660dcdefb3216eafb97627e6a717e96f9a47a
        <div className="flex items-center justify-center shrink-0 w-[64px] h-[64px] bg-[#D0F348]/30 rounded-lg">
            <Image
                src={iconSrc}
                alt={alt}
                width={45}
                height={47}
                sizes="64px"
                className="w-[45px] h-[47px]"
                priority
            />
        </div>
        <div className='flex flex-col gap-5 text-white'>
            <p className='text-3xl font-semibold'>{title}</p>
            <p className='text-xl font-medium'>{desc}</p>
        </div>
<<<<<<< HEAD
    </div>
=======
    </motion.div>
>>>>>>> 36c660dcdefb3216eafb97627e6a717e96f9a47a
)

const Services = () => {
    return (
        <section className='bg-black py-20'>
            <div className="flex px-36 py-20 gap-20">
<<<<<<< HEAD
                {/* Kolom gambar */}
                <div className="flex flex-col gap-3.5">
                    <div className="relative w-[407px] aspect-[3/2] overflow-hidden rounded-2xl bg-gray-100">
=======
                <div className="flex flex-col gap-3.5">
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ amount: 0.4 }}
                        transition={{ type: 'spring', stiffness: 60, damping: 18, mass: 0.2 }}
                        className="relative w-[407px] aspect-[3/2] overflow-hidden rounded-2xl bg-gray-100">
>>>>>>> 36c660dcdefb3216eafb97627e6a717e96f9a47a
                        <Image
                            src="/assets/take.jpg"
                            alt='buy something in store'
                            fill
                            className="object-cover object-center"
                        />
<<<<<<< HEAD
                    </div>
                    <div className="relative w-[407px] aspect-[5/3] overflow-hidden rounded-2xl bg-gray-100">
=======
                    </motion.div>
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ amount: 0.4 }}
                        transition={{ type: 'spring', stiffness: 60, damping: 18, mass: 0.2 }}
                        className="relative w-[407px] aspect-[5/3] overflow-hidden rounded-2xl bg-gray-100">
>>>>>>> 36c660dcdefb3216eafb97627e6a717e96f9a47a
                        <Image
                            src="/assets/give.jpg"
                            alt='give something'
                            fill
                            className="object-cover object-center"
                        />
<<<<<<< HEAD
                    </div>
                    <div className="relative w-[407px] aspect-[3/2] overflow-hidden rounded-2xl bg-gray-100">
=======
                    </motion.div>
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ amount: 0.4 }}
                        transition={{ type: 'spring', stiffness: 60, damping: 18, mass: 0.2 }}
                        className="relative w-[407px] aspect-[3/2] overflow-hidden rounded-2xl bg-gray-100">
>>>>>>> 36c660dcdefb3216eafb97627e6a717e96f9a47a
                        <Image
                            src="/assets/meet.jpg"
                            alt='team meeting'
                            fill
                            className="object-cover object-center"
                        />
<<<<<<< HEAD
                    </div>
=======
                    </motion.div>
>>>>>>> 36c660dcdefb3216eafb97627e6a717e96f9a47a
                </div>

                <div className='flex flex-col gap-20'>
                    <div className="flex flex-col gap-9">
                        <p className='text-6xl text-[#D0F348]'>Services</p>
                        <p className='text-2xl text-white'>
                            Kami hadir untuk menyederhanakan akses Anda ke pangan berkualitas, sambil memberdayakan komunitas lokal. Temukan bagaimana kami mewujudkannya.
                        </p>
                    </div>

                    <div className='flex flex-col gap-12'>
                        {services.map(s => (
                            <ServiceItem
                                key={s.title}
                                iconSrc={s.iconSrc}
                                alt={s.alt}
                                title={s.title}
                                desc={s.desc}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Services