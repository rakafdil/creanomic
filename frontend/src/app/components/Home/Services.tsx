"use client"

import { ListWithIcon } from '@/Types/ListWithIcon'
import Image from 'next/image'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'


const services: ListWithIcon[] = [
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

const ServiceItem: React.FC<ListWithIcon> = ({ iconSrc, alt, title, desc }) => (
    <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ amount: 0.4 }}
        transition={{ type: 'spring', stiffness: 60, damping: 18, mass: 1.1 }}
        className='flex gap-5 sm:gap-7 lg:gap-9'>
        <div className="flex items-center justify-center shrink-0 w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] lg:w-[64px] lg:h-[64px] bg-[#D0F348]/30 rounded-lg">
            <Image
                src={iconSrc}
                alt={alt}
                width={45}
                height={47}
                sizes="(max-width: 640px) 36px, (max-width: 1024px) 40px, 45px"
                className="w-[36px] h-[38px] sm:w-[40px] sm:h-[42px] lg:w-[45px] lg:h-[47px]"
                priority
            />
        </div>
        <div className='flex flex-col gap-3 sm:gap-4 lg:gap-5 text-white'>
            <p className='text-xl sm:text-2xl lg:text-3xl font-semibold'>{title}</p>
            <p className='text-base sm:text-lg lg:text-xl font-medium'>{desc}</p>
        </div>
    </motion.div>
)

const Services = () => {
    return (
        <section className='bg-black py-12 sm:py-16 lg:py-20'>
            <div className="flex flex-col lg:flex-row px-6 sm:px-12 lg:px-24 xl:px-36 py-12 sm:py-16 lg:py-20 gap-10 sm:gap-14 lg:gap-20">
                <div className="flex flex-col gap-3 sm:gap-3.5">
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ amount: 0.4 }}
                        transition={{ type: 'spring', stiffness: 60, damping: 18, mass: 0.2 }}
                        className="relative w-full lg:w-[320px] xl:w-[407px] aspect-[3/2] overflow-hidden rounded-2xl bg-gray-100">
                        <Image
                            src="/assets/take.jpg"
                            alt='buy something in store'
                            fill
                            className="object-cover object-center"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ amount: 0.4 }}
                        transition={{ type: 'spring', stiffness: 60, damping: 18, mass: 0.2 }}
                        className="relative w-full lg:w-[320px] xl:w-[407px] aspect-[5/3] overflow-hidden rounded-2xl bg-gray-100">
                        <Image
                            src="/assets/give.jpg"
                            alt='give something'
                            fill
                            className="object-cover object-center"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ amount: 0.4 }}
                        transition={{ type: 'spring', stiffness: 60, damping: 18, mass: 0.2 }}
                        className="relative w-full lg:w-[320px] xl:w-[407px] aspect-[3/2] overflow-hidden rounded-2xl bg-gray-100">
                        <Image
                            src="/assets/meet.jpg"
                            alt='team meeting'
                            fill
                            className="object-cover object-center"
                        />
                    </motion.div>
                </div>

                <div className='flex flex-col gap-12 sm:gap-16 lg:gap-20'>
                    <div className="flex flex-col gap-6 sm:gap-7 lg:gap-9">
                        <p className='text-4xl sm:text-5xl lg:text-6xl text-[#D0F348]'>Services</p>
                        <p className='text-lg sm:text-xl lg:text-2xl text-white'>
                            Kami hadir untuk menyederhanakan akses Anda ke pangan berkualitas, sambil memberdayakan komunitas lokal. Temukan bagaimana kami mewujudkannya.
                        </p>
                    </div>

                    <div className='flex flex-col gap-8 sm:gap-10 lg:gap-12'>
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