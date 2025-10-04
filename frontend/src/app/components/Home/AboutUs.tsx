import React from 'react'
import Button from '../Common/Button'
import Image from 'next/image'

const AboutUs = () => {
    return (
        <section className='py-20'>
            <div className='border-b-4 border-[#DEDEDE] mb-10' />
            <div className="flex gap-6 py-1">
                <Button className='bg-lime-300'>About Us</Button>
                <Button className='border-2 border-[#CDCDCD]'>Vision</Button>
                <Button className='border-2 border-[#CDCDCD]'>Mission</Button>
            </div>
            <div className="flex gap-6.5 py-11">
                <div className="relative min-w-[420px] min-h-[280px] overflow-hidden rounded-2xl bg-gray-100">
                    <Image
                        src="/assets/sawah.jpg"
                        alt="sawah"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className='flex flex-col gap-4 justify-center'>
                    <p className='text-5xl font-sans font-medium'>
                        Menjembatani Kebaikan dari Ladang ke Meja Makan.
                    </p>
                    <p className='text-2xl font-medium'>
                        Dengan semangat memberdayakan komunitas lokal, kami berkomitmen untuk menghubungkan para petani dan peternak langsung dengan Anda. Bersama, kita wujudkan ekosistem pangan yang lebih sehat dan berkelanjutan untuk Indonesia.
                    </p>
                </div>
            </div>
            <div className='flex w-full gap-6'>
                <div className="relative w-[285px] h-[400px] overflow-hidden rounded-2xl bg-[#E1E1E1]">
                    <Image
                        src="/assets/petani.jpg"
                        alt="petani"
                        fill
                        className="object-cover object-center"
                    />
                </div>
                <div className="flex-col gap-2 relative w-[285px] h-[400px] overflow-hidden rounded-2xl bg-[#E1E1E1] flex text-left py-5 px-8">
                    <p className="font-bold text-4xl">500+</p>
                    <p className="font-bold text-xl">Mitra Petani & UMKM Lokal</p>
                    <p className='font-medium text-lg'>Kami telah bermitra dengan ratusan petani, peternak, dan UMKM pangan lokal, memberikan mereka platform yang adil dan transparan untuk bertumbuh dan sejahtera.</p>
                </div>
                <div className="relative w-[285px] h-[400px] overflow-hidden rounded-2xl bg-[#E1E1E1]">
                    <Image
                        src="/assets/tomat.jpg"
                        alt="tomat"
                        fill
                        className="object-cover object-center"
                    />
                </div>
                <div className="flex-col gap-2 relative w-[285px] h-[400px] overflow-hidden rounded-2xl bg-[#D0F348] flex text-left py-5 px-8">
                    <p className="font-bold text-4xl">95%</p>
                    <p className="font-bold text-xl">Tingkat Kesegaran Produk</p>
                    <p className='font-medium text-lg'>Kami memastikan produk yang sampai ke tangan Anda memiliki kualitas terbaik. Pengguna mempercayai kami untuk menghadirkan hasil bumi segar langsung dari sumbernya.</p>
                </div>
            </div>
        </section>
    )
}

export default AboutUs