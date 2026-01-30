import React from 'react'
import ImageSlider from '../Layout/imageSlider'
import Footer from './Footer'
import Services from './Services'
import BrandLogoSlider from './Brand Logo Slider'
import Sales from '../Layout/Sales'
import Category from '../Layout/Category'
//import MenNewArrivals from '../Layout/MenNewArrivals'
import WomanNewArrivals from '../Layout/WomanNewArrivals'
import MenNewArrivals from '../Layout/MenNewArrivals'
//import ProductSlider from '../Layout/ProductSlider'

const Home = () => {
  return (
    <div >
    <section >
        <ImageSlider/>
    </section>

    <section className='pt-173.75'>
        <MenNewArrivals/>
    </section>

    <section className=''>
        <WomanNewArrivals/>
    </section>

    <section className='pt-10'>
        <Services/>
    </section>

    <section className='pt-10'>
      <Category/>
    </section>

    <section className=''>
      <Sales/>
    </section>

    <section className=''>
      <BrandLogoSlider/>
    </section>

    <section className='pt-10'>
      <Footer/>
    </section>
        
    </div>
  )
}

export default Home