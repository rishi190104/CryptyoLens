
import Paragraph from 'antd/es/typography/Paragraph'
import Title from 'antd/es/typography/Title'
import React from 'react'
import Carousel from './Carousel'

const Banner = () => {
  return (
   <main className="w-full md:bg-hero-pattern  h-[444px] bg-cover pt-5">
    <div className='backdrop-blur-sm'>
    <div className='flex justify-center items-center flex-col w-full '>
     <Title level={1} 
     className='text-white text-5xl font-bold pt-2 font-crypto'
     >
        CryptoLens
        </Title>  
        <Paragraph
        className='text-gray-400 text-lg font-crypto'
        >
        Get all the Info regarding your favorite Crypto Currency
        </Paragraph>
    </div>
   
        <Carousel/>
        </div>
   </main>
  )
}

export default Banner
