import React, { useEffect } from 'react'

interface Element {
    icon: any
    title: string
    action: Function
    isActive: boolean
}

interface FootbarProps {
    setIsCouponOpen: Function
    isCouponOpen: boolean
}

const Footbar = ({ setIsCouponOpen, isCouponOpen }: FootbarProps) => {
    const elements: Element[] = [
        {
            icon: <i className='fa-solid fa-futbol'></i>,
            title: 'Sport',
            action: () => {},
            isActive: false,
        },
        {
            icon: <i className='fa-regular fa-calendar'></i>,
            title: 'Teraz',
            action: () => {},
            isActive: false,
        },
        {
            icon: <i className='fa-solid fa-fire'></i>,
            title: 'Popularne',
            action: () => {},
            isActive: true,
        },
        {
            icon: <i className='fa-solid fa-star'></i>,
            title: 'Misje',
            action: () => {},
            isActive: false,
        },
        {
            icon: <i className='fa-solid fa-percent'></i>,
            title: 'Promocje',
            action: () => {},
            isActive: false,
        },
    ]
    return (
        <div className='footbar-container'>
            {elements.map((element, index) => {
                return (
                    <div
                        key={index}
                        className={`element-container ${
                            element.isActive ? 'active' : ''
                        }`}
                    >
                        <div className='icon-container'>{element.icon}</div>
                        <div className='title-container'>{element.title}</div>
                    </div>
                )
            })}
            <div
                className='cart-container'
                onClick={() => {
                    setIsCouponOpen(true)
                }}
            >
                <i className='fa-solid fa-cart-shopping'></i>
            </div>
        </div>
    )
}

export default Footbar
