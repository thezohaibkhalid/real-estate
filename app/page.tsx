import React from 'react'
import HeroBg from '@/components/Hero-bg'
import Listings from '@/components/Listings'
import AboutUs from '@/components/AboutUs'
import FeaturedListings from '@/components/FeaturedListings'
import PopularCities from '@/components/PopularCities'
import GetInTouch from '@/components/GetInTouch'
import Testimonials from '@/components/Testimonial'

export default function Home() {
  return (
    <div>
      <HeroBg />
      <Listings />
      <AboutUs />
      <FeaturedListings />
      <PopularCities />
      <Testimonials />
      <GetInTouch />
    </div>
  )
}
