<<<<<<< HEAD
import React from 'react'
import Image from 'next/image'
import Button from '../Common/Button'
=======
"use client"
import React from 'react'
import Image from 'next/image'
import Button from '../Common/Button'
import { AnimatePresence, motion } from 'framer-motion'

const fade = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 }
}
>>>>>>> 36c660dcdefb3216eafb97627e6a717e96f9a47a

const Hero = () => {
    return (
        <section className='relative w-full min-h-[1080px] flex items-end overflow-hidden pb-31 text-white font-inter'>
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

            <div className='flex flex-col gap-5 max-w-4xl pl-38 pr-8 text-left items-start'>
<<<<<<< HEAD
                <div className='backdrop-blur-xs text-2xl px-7 py-3 rounded-[40px] bg-black/20'>Ekonomi Hijau & Pangan Inklusif</div>
                <div className='flex flex-col gap-6'>
                    <h1 className='text-5xl leading-tight font-semibold'>
                        Pangan Segar Lokal<br />
                        Tumbuh Bersama Komunitas.
                    </h1>
                    <p className='text-2xl text-white font-medium'>
                        GrowthWell adalah platform hibrida yang menghubungkan Anda langsung dengan hasil tani dan ternak terbaik dari petani lokal, sekaligus menyalurkan pangan bergizi untuk yang membutuhkan melalui program donasi.
                    </p>
                </div>
                <Button className='self-start bg-lime-300 text-black' iconSrc='assets/arrow.svg'>Get Started</Button>
=======
                <motion.div
                    variants={fade}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ amount: 0.4 }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className='backdrop-blur-xs text-2xl px-7 py-3 rounded-[40px] bg-black/20'>Ekonomi Hijau & Pangan Inklusif
                </motion.div>
                <div className='flex flex-col gap-6'>
                    <motion.h1
                        variants={fade}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ amount: 0.4 }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className='text-5xl leading-tight font-semibold'>
                        Pangan Segar Lokal<br />
                        Tumbuh Bersama Komunitas.
                    </motion.h1>
                    <motion.p
                        variants={fade}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ amount: 0.4 }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className='text-2xl text-white font-medium'>
                        GrowthWell adalah platform hibrida yang menghubungkan Anda langsung dengan hasil tani dan ternak terbaik dari petani lokal, sekaligus menyalurkan pangan bergizi untuk yang membutuhkan melalui program donasi.
                    </motion.p>
                </div>
                <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                    <Button className='self-start bg-lime-300 text-black' iconSrc='assets/arrow.svg'>Get Started</Button>
                </motion.span>
>>>>>>> 36c660dcdefb3216eafb97627e6a717e96f9a47a
            </div>
        </section>
    )
}

export default Hero
