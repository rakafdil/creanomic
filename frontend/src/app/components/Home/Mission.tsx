import Image from 'next/image'
import React from 'react'

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
        <li>
            <div className="flex flex-col gap-1 pb-3 border-b-3 border-white">
                <span className="text-2xl">{title}</span>
                <span className="text-base">
                    {desc}
                </span>
            </div>
        </li>
    )
}
const Mission = () => {
    return (
        <div className='flex flex-col gap-6 py-11'>
            <div className='flex gap-6'>
                <div className="relative flex-1 aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100 px-12 py-5">
                    <Image
                        src="/assets/laugh_together_to_veggies.png"
                        alt='laughing to veggies'
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-col text-white relative flex-1 aspect-[3/4] overflow-hidden rounded-2xl bg-[#1D582E] p-12 gap-8 font-semibold">
                    <span className='text-4xl'>
                        Misi Kami dalam Aksi
                    </span>
                    <span className='text-xl'>
                        Misi kami adalah aksi nyata. Kami membangun jembatan yang adil dan transparan dari produsen lokal langsung ke meja Anda melalui pilar-pilar utama berikut.
                    </span>
                    <div className="px-10">
                        <div>
                            <ul className="list-disc space-y-8">
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
                </div>
            </div>
        </div>
    )
}

export default Mission