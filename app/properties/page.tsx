import React from 'react'
import Listings from '@/components/Listings'
import PageHeader from '@/components/common/PageHeader'
import GetInTouch from '@/components/GetInTouch'
const PropertiesPage = () => {
  return (
    <div>
        <PageHeader title="Properties" image="https://cdn.prod.website-files.com/66838388801e7faa61c613c3/66838388801e7faa61c61460_bg-global.webp" breadcrumb={[{ label: "Home", href: "/" }, { label: "Properties", href: "/properties" }]} />
      <Listings />
      <GetInTouch />
    </div>
  )
}

export default PropertiesPage