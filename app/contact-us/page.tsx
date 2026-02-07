import React from 'react'
import PageHeader from '@/components/common/PageHeader'
import ContactUsForm from '@/components/common/ContactUsForm'
import GetInTouch from '@/components/GetInTouch'
export default function ContactUsPage() {
  return (
    <div>
        <PageHeader title="Contact Us" image="https://cdn.prod.website-files.com/66838388801e7faa61c613c3/66838388801e7faa61c61460_bg-global.webp" breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact Us", href: "/contact-us" }]} />
        <ContactUsForm />
        <GetInTouch />
    </div>
  )
}
