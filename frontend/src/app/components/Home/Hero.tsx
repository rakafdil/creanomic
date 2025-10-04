import React from 'react'
import Image from 'next/image'
import Button from '../Common/Button'

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
                <Button className='self-start bg-lime-300' iconSrc='assets/arrow.svg'>Get Started</Button>
            </div>
        </section>
    )
}

export default Hero
