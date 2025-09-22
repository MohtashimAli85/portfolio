
'use client'
import React from 'react'
import Item from './Menu/Item'

const ContactMe = () => {
  return (
    <div className='hidden md:block text-secondary-dark basis-[10%] [&>li]:w-full [&>li]:block [&>li>a]:block [&>li]:border-r-0!  [&>li>a]:py-[14px]  whitespace-nowrap'>
      <Item href='/contact-me' />
    </div>
  )
}

export default ContactMe