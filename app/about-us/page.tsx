import React from 'react'
import PageHeader from '@/components/common/PageHeader'
import AboutUsNumbers from '@/components/about/AboutUsNumbers'
import OurValues from '@/components/about/OurValues'
import CeoWords from '@/components/about/CeoWords'
import GetInTouch from '@/components/GetInTouch'
const page = () => {
  return (
    <div>
      <PageHeader title="About Us" image="https://cdn.prod.website-files.com/66838388801e7faa61c613c3/66838388801e7faa61c61460_bg-global.webp" breadcrumb={[{ label: "Home", href: "/" }, { label: "About Us", href: "/about-us" }]} />
      <AboutUsNumbers />
      <CeoWords />
      <hr className="w-full text-gray-300 max-w-[1350px] mx-auto px-[4%] mx:px-0" />
      <OurValues />
      <GetInTouch />
    </div>
  )
}

export default page