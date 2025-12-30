"use client"
import { FaArrowUp } from "react-icons/fa"
import React, { useEffect, useState } from "react"

const ToTop: React.FC = () => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > 300)
        }
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    if (!visible) return null

    return (
        <button
            onClick={scrollTop}
            aria-label="Scroll to top"
            className="cursor-pointer fixed bottom-6 right-6 z-50 rounded-full bg-lime-300 text-black shadow-lg
                 w-12 h-12 flex items-center justify-center font-bold text-xl
                 hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
            <FaArrowUp />
        </button>
    )
}

export default ToTop