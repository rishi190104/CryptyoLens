import React, { useEffect, useState } from 'react'
import 'react-alice-carousel/lib/alice-carousel.css';


import { useCryptoContext } from '../context/CryptoContext'
import { Link } from 'react-router-dom'
import AliceCarousel from 'react-alice-carousel'

const Carousel = () => {

    const {currency} = useCryptoContext()
    const [trending, setTrending] = useState([])

    const TrendingCoin = async(currency) => {
        const response = await fetch(`https://api.coingecko.com/api/v3/search/trending?vs_currency=${currency}&price_change_percentage_24h`)
         const data = await response.json()
        console.log(data.coins)
        setTrending(data.coins)
    }
useEffect(() => {
    TrendingCoin()
}, [currency])
    

const items = trending.map((coin) => {
  const coinData = coin.item;
  const profit = coinData.price_change_percentage_24h > 0;
  return (
    
    <div className='flex text-white backdrop-blur-sm  w-30 p-10 mt-5'>
      <Link className='flex flex-col justify-center items-center'
      to={`/coins/${coinData.id}`}
      >
    <img src={coinData.thumb} alt={coinData.name} />
    <br />

    <span className='text-xl font-bold font-crypto'>{coinData.symbol}</span>
    <span className='text-lg font-bold font-crypto'>{coinData.name}</span>
    </Link>
    </div>
    
  )
}


)
const responsive = {
  0:{
    items: 2,
  },
  512:{
    items: 4,
  }
}

  return (
    <div className='w-full h-fit flex items-center'>
      <div className='max-w-screen-xl mx-auto'>
      <AliceCarousel
      items={items}
      mouseTracking
      responsive={responsive}
      autoPlay
      disableButtonsControls
      disableDotsControls
      animationDuration={2000}
      >
        
        </AliceCarousel> 
        </div>
    </div>
  )
}

export default Carousel