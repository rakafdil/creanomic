"use client"
import React from 'react'
import Image from 'next/image'
import Button from '../Common/Button'
import { AnimatePresence, motion } from 'framer-motion'

const fade = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 }
}

const Hero = () => {
    return (
        <section className='relative w-full min-h-screen md:min-h-[1080px] flex items-end overflow-hidden pb-12 md:pb-20 lg:pb-31 text-white font-inter'>
            <div className='absolute inset-0 -z-10'>
                <Image
                    src='/assets/hero.svg'
                    alt='Hero background'
                    fill
                    priority
                    className='object-cover'
                />
                <div className='absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.4)_0%,rgba(102,102,102,0)_100%)]' />
            </div>

            <div className='flex flex-col gap-4 md:gap-5 max-w-4xl px-5 sm:px-8 md:pl-16 lg:pl-38 md:pr-8 text-left items-start w-full'>
                <motion.div
                    variants={fade}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ amount: 0.4 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className='backdrop-blur-xs text-sm sm:text-base md:text-lg lg:text-2xl px-4 sm:px-5 md:px-7 py-2 md:py-3 rounded-[40px] bg-black/20'>
                    Ekonomi Hijau & Pangan Inklusif
                </motion.div>
                
                <div className='flex flex-col gap-4 md:gap-6'>
                    <motion.h1
                        variants={fade}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ amount: 0.4 }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className='text-3xl sm:text-4xl md:text-5xl leading-tight font-semibold'>
                        Pangan Segar Lokal<br />
                        Tumbuh Bersama Komunitas.
                    </motion.h1>
                    
                    <motion.p
                        variants={fade}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ amount: 0.4 }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className='text-base sm:text-lg md:text-xl lg:text-2xl text-white font-medium'>
                        GrowthWell adalah platform hibrida yang menghubungkan Anda langsung dengan hasil tani dan ternak terbaik dari petani lokal, sekaligus menyalurkan pangan bergizi untuk yang membutuhkan melalui program donasi.
                    </motion.p>
                </div>
                
                <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                    <Button className='self-start bg-lime-300 text-black' iconSrc='assets/arrow.svg'>
                        Get Started
                    </Button>
                </motion.span>
            </div>
        </section>
    )
}

export default Hero