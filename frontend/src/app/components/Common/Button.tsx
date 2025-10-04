import React from 'react'
import Image from 'next/image'

type ButtonProps = {
    children: React.ReactNode
    onClick?: () => void
    iconSrc?: string
    iconAlt?: string
    className?: string
    icon?: React.ReactNode
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    iconSrc,
    iconAlt = 'icon',
    className = '',
    icon,
    disabled = false
}) => {
    return (
        <button
            id='medium3'
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`
                ${className}
        inline-flex items-center justify-center gap-2
        rounded-[40px] px-6 py-4
         text-black font-medium font-inter leading-none
        disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
        transition-all duration-300 hover:brightness-55 hover:scale-110 active:scale-[0.97]
      `}
        >
            <span className="whitespace-nowrap leading-none m-0 p-0">{children}</span>
            {iconSrc && (
                <span
                    className="flex items-center justify-center"
                >

                    {icon
                        ? icon
                        : iconSrc && (
                            <Image
                                src={iconSrc}
                                alt={iconAlt}
                                width={30}
                                height={30}
                            />
                        )
                    }
                </span>
            )
            }
        </button>
    )
}

export default Button