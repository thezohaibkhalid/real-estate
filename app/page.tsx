import React from 'react'
import HeroBg from '@/components/Hero-bg'
import Listings from '@/components/Listings'
import AboutUs from '@/components/AboutUs'
import FeaturedListings from '@/components/FeaturedListings'
import PopularCities from '@/components/PopularCities'
export default function Home() {
  return (
    <div>
      <HeroBg />
      <Listings />
      <AboutUs />
      <FeaturedListings />
      <PopularCities />
    </div>
  )
}
