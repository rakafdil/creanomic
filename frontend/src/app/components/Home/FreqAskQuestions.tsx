import Image from 'next/image'
import React from 'react'
import Button from '../Common/Button'

type Question = {
    question: string
    answer: string
}

const questions: Question[] = [
    {
        question: "Apa itu GrowthWell",
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
                <div className="flex-1 flex flex-col gap-9">
                    {questions.map(q => (
                        <QuestionItem
                            key={q.question}
                            question={q.question}
                            answer={q.answer}
                        />
                    ))}
                </div>

                <div className='flex flex-col gap-12'>
                    <div className="flex flex-col gap-5 w-[430px] bg-[#0A3917] rounded-3xl p-8 text-white text-center align-middle h-fit">
                        <Image
                            src='/assets/entypo_chat.svg'
                            width={80}
                            height={80}
                            alt='chat'
                            className='self-center'
                        />
                        <div className='flex flex-col gap-2'>
                            <span className='text-xl font-semibold'>Punya pertanyaan lain?</span>
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