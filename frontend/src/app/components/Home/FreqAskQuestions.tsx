<<<<<<< HEAD
import Image from 'next/image'
import React from 'react'
import Button from '../Common/Button'
=======
'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import Button from '../Common/Button'
import { AnimatePresence, motion } from 'framer-motion'
>>>>>>> 36c660dcdefb3216eafb97627e6a717e96f9a47a

type Question = {
    question: string
    answer: string
}

const questions: Question[] = [
    {
        question: "Apa itu GrowthWell",
<<<<<<< HEAD
        answer: ""
    },
    {
        question: "Bagaimana cara kerja sistem donasi di GrowthWell?",
        answer: ""
    },
    {
        question: "Dari mana asal produk yang dijual?",
        answer: ""
    },
    {
        question: "Bagaimana GrowthWell menjamin kualitas produk?",
        answer: ""
    },
    {
        question: "Saya seorang petani/produsen, bagaimana cara saya bergabung?",
        answer: ""
    },
]

const QuestionItem: React.FC<Question> = ({ question, answer }) => (
    <details className="w-full py-5 px-6 bg-[#E5E5E5] border border-[#999999] rounded-xl group">
        <summary className="cursor-pointer list-none flex justify-between items-center text-2xl font-medium">
            {question}
            <span className="transition-transform duration-300 group-open:rotate-45 text-[#0A3917] text-4xl leading-none">+</span>
        </summary>
        <p className="mt-3 text-[#0A3917]/80 text-base">
            {answer}
        </p>
    </details>
)
const FreqAskQuestions = () => {
=======
        answer: "GrowthWell adalah marketplace digital yang menghubungkan petani, peternak, dan UMKM pangan lokal langsung dengan Anda. Misi kami adalah menyediakan akses mudah ke pangan segar berkualitas, sambil mendukung ekonomi lokal dan meningkatkan gizi komunitas melalui program donasi."
    },
    {
        question: "Bagaimana cara kerja sistem donasi di GrowthWell?",
        answer: "Anda dapat membeli produk yang ditujukan khusus untuk donasi. Kami kemudian bekerja sama dengan mitra komunitas dan yayasan lokal untuk menyalurkan produk tersebut langsung kepada mereka yang membutuhkan melalui program makanan bergizi gratis."
    },
    {
        question: "Dari mana asal produk yang dijual?",
        answer: "Semua produk di platform kami berasal langsung dari mitra lokal terkurasi, meliputi petani, peternak, dan UMKM pangan dari berbagai daerah di Indonesia. Kami mengutamakan transparansi, sehingga Anda sering kali dapat melihat asal-usul produk di halaman detailnya."
    },
    {
        question: "Bagaimana GrowthWell menjamin kualitas produk?",
        answer: "Kami memiliki proses kurasi yang ketat untuk para mitra. Selain itu, tim kami menerapkan kontrol kualitas berlapis, mulai dari sumber di lahan hingga pengemasan, untuk memastikan setiap produk yang sampai ke tangan Anda memenuhi standar kesegaran tertinggi."
    },
    {
        question: "Saya seorang petani/produsen, bagaimana cara saya bergabung?",
        answer: "Kami selalu terbuka untuk mitra baru yang memiliki visi yang sama! Silakan kunjungi halaman \"Mitra Kami\" dan isi formulir pendaftaran. Tim kami akan segera menghubungi Anda untuk proses kurasi dan onboarding lebih lanjut."
    },
]

type QuestionItemProps = Question & {
    isOpen: boolean
    onToggle: () => void
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question, answer, isOpen, onToggle }) => {
    return (
        <motion.div
            layout
            className="w-full flex flex-col gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
        >
            <button
                type="button"
                onClick={onToggle}
                className="w-full px-6 py-5 bg-[#E5E5E5] border border-[#999999] rounded-xl flex justify-between items-center text-2xl font-medium text-left group transition-colors cursor-pointer hover:bg-[#dcdcdc]"
            >
                <span className="text-[#0A3917]">{question}</span>
                <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-[#0A3917] text-4xl leading-none"
                >
                    +
                </motion.span>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="answer"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { height: 'auto', opacity: 1 },
                            collapsed: { height: 0, opacity: 0 }
                        }}
                        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                        layout
                    >
                        <div className="w-full px-6 py-5 bg-[#0A3917] rounded-xl text-base text-white font-semibold">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

const FreqAskQuestions = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(-1)

>>>>>>> 36c660dcdefb3216eafb97627e6a717e96f9a47a
    return (
        <section className="flex flex-col gap-8 py-20">
            <div className='flex flex-col gap-6 justify-center items-center'>
                <div className="flex items-center justify-center gap-3.5">
                    <span className='flex items-center gap-1.5'>
                        <Image
                            src="/assets/logo_icon.svg"
                            alt="GrowthWell logo"
                            width={48}
                            height={48}
                            priority
                        />
                        <span className="text-[#74AB35] text-2xl font-semibold">GrowthWell</span>
                    </span>
                    <span className="text-[#74AB35] text-3xl font-semibold">
                        FAQs
                    </span>
                </div>
                <span
                    className='text-5xl font-semibold text-[#0A3917]'
                >
                    Ada Pertanyaan? Cari di Sini.
                </span>
            </div>

            <div className="flex gap-16 justify-between">
<<<<<<< HEAD
                <div className="flex-1 flex flex-col gap-9">
                    {questions.map(q => (
                        <QuestionItem
                            key={q.question}
                            question={q.question}
                            answer={q.answer}
                        />
                    ))}
=======
                <div className="flex-1 flex flex-col gap-6">
                    <AnimatePresence mode="popLayout">
                        {questions.map((q, i) => (
                            <QuestionItem
                                key={q.question}
                                question={q.question}
                                answer={q.answer}
                                isOpen={openIndex === i}
                                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                            />
                        ))}
                    </AnimatePresence>
>>>>>>> 36c660dcdefb3216eafb97627e6a717e96f9a47a
                </div>

                <div className='flex flex-col gap-12'>
                    <div className="flex flex-col gap-5 w-[430px] bg-[#0A3917] rounded-3xl p-8 text-white text-center align-middle h-fit">
                        <Image
                            src='/assets/entypo_chat.svg'
<<<<<<< HEAD
                            width={80}
                            height={80}
=======
                            width={70}
                            height={70}
>>>>>>> 36c660dcdefb3216eafb97627e6a717e96f9a47a
                            alt='chat'
                            className='self-center'
                        />
                        <div className='flex flex-col gap-2'>
<<<<<<< HEAD
                            <span className='text-xl font-semibold'>Punya pertanyaan lain?</span>
=======
                            <span className='text-2xl font-semibold'>Punya pertanyaan lain?</span>
>>>>>>> 36c660dcdefb3216eafb97627e6a717e96f9a47a
                            <span className='text-xs'>Tim kami siap menjawab setiap pertanyaan Anda dengan respons yang cepat dan solutif.</span>
                        </div>
                        <Button className='bg-[#D0F348] self-center text-[#0A3917]'>
                            Hubungi Kami
                        </Button>
                    </div>
                    <div className="flex flex-row gap-5 w-[430px] bg-[#E1E1E1] rounded-3xl p-8 text-white text-center align-middle h-fit border-1 border-[#999]">
                        <div className='flex justify-center bg-[#D0F348] rounded-full p-3 self-start'>
                            <Image
                                src='/assets/phone.svg'
                                width={20}
                                height={20}
                                alt='chat'
                                className='self-center'
                            />
                        </div>
                        <div className='flex flex-col gap-2.5'>
                            <span className='text-xl font-semibold text-[#494949] text-left'>
                                Dukungan Penuh Untuk Anda
                            </span>
                            <span className='text-4xl font-semibold text-[#0A3917] text-left'>
                                24/7  Service
                            </span>
                            <span className='text-xl font-semibold text-[#494949] text-left'>
                                (021) 000-0000
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FreqAskQuestions