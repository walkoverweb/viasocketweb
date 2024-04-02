import React, { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import IntegrationSearch from '@/components/integration/integrationApps'
import GetStarted from '@/components/getStarted/getStarted'
import { getDbdashData } from '../api'
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp'

export const config = {
    runtime: 'experimental-edge',
  }

const IntegrationSlugPage = ({
    getStartedData,
    responseData,
    pathArray,
    metaData,
}) => {
    //defined states
    const [apps, setApps] = useState(responseData)
    const [filteredData, setFilteredData] = useState([])
    const [visibleItems, setVisibleItems] = useState(25)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [loading, setLoading] = useState()
    const [visibleCategories, setVisibleCategories] = useState(10)

    const router = useRouter()
    const { currentcategory } = router.query

    useEffect(() => {
        router.push('/integration?currentcategory=All')
    }, [])

    //fetch apps
    useEffect(() => {
        setApps(responseData)
        setLoading(false)
        setSelectedCategory(currentcategory)
    }, [currentcategory, visibleItems])

    //fetch apps

    useEffect(() => {
        setVisibleItems(25)
    }, [selectedCategory])

    //fetch icons

    const handleLoadMore = () => {
        setVisibleItems(visibleItems + 25)
    }

    //search functions
    const applyFilters = () => {
        let filteredItems = apps.filter((item) => {
            const nameMatches = item.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            const categoryMatches =
                selectedCategory === 'All' ||
                item.category === selectedCategory ||
                !item.category
            return nameMatches && categoryMatches
        })

        setFilteredData(filteredItems)
    }

    useEffect(() => {
        applyFilters()
    }, [apps, searchTerm, currentcategory])

    const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
    const handleCategoryClick = () => {
        setCategoryDropdownOpen(!isCategoryDropdownOpen)
    }

    // const uniqueCategories = ["All", "Human Resources", "Productivity","Marketing", "IT Operations", "Support", "Website Building","E-commerce platform", "Social media ", "Communication", "Other"];
    const uniqueCategories = [
        'All',
        'Engineering',
        'Productivity',
        'Marketing',
        'IT',
        'Support',
        'Website Builders',
        'Databases',
        'Social Media Accounts',
        'Communication',
        'Accounting',
        'Ads & Conversion',
        'AI Tools',
        'Analytics',
        'App Builder',
        'App Families',
        'Bookmark Managers',
        'Business Intelligence',
        'Calendar',
        'Call Tracking',
        'Website & App Building',
        'Commerce',
        'Communication',
        'Contact Management',
        'Content & Files',
        'CRM (Customer Relationship Management)',
        'Customer Appreciation',
        'Customer Support',
        'Dashboards',
        'Developer Tools',
        'Devices',
        'Documents',
        'Drip Emails',
        'eCommerce',
        'Education',
        'Email',
        'Email Newsletters',
        'Event Management',
        'Fax',
        'File Management & Storage',
        'Filters',
        'Fitness',
        'Forms & Surveys',
        'Fundraising',
        'Gaming',
        'Human Resources',
        'HR Talent & Recruitment',
        'Images & Design',
        'Internet of Things',
        'Proposal & Invoice Management',
        'IT Operations',
        'Online Courses',
        'Lifestyle & Entertainment',
        'Marketing Automation',
        'News & Lifestyle',
        'Notes',
        'Notifications',
        'Payment Processing',
        'Phone & SMS',
        'Printing',
        'Product Management',
        'Productivity',
        'Project Management',
        'Reviews',
        'Sales & CRM',
        'Scheduling & Booking',
        'Security & Identity Tools',
        'Server Monitoring',
        'Signatures',
        'Social Media Marketing',
        'Spreadsheets',
        'Support',
        'Taxes',
        'Team Chat',
        'Team Collaboration',
        'Time Tracking Software',
        'Task Management',
        'Transactional Email',
        'Transcription',
        'URL Shortener',
        'Video & Audio',
        'Video Conferencing',
        'Webinars',
    ]
    const renderFilterOptions = () => {
        return uniqueCategories.slice(0, visibleCategories).map((category) => (
            <Link
                href={`/integration?currentcategory=${category}`}
                aria-label="select category"
            >
                <h6
                    key={category}
                    onClick={() => {
                        setSelectedCategory(category)
                        category !== selectedCategory ? setLoading(true) : ''
                    }}
                    className={`lg:text-[20px] text-base cursor-pointer ${
                        selectedCategory === category
                            ? 'font-bold'
                            : 'font-normal'
                    }`}
                >
                    {category === 'Null' ? 'Other' : category}
                </h6>
            </Link>
        ))
    }
    const handleCategoryLoadMore = () => {
        setVisibleCategories(visibleCategories + 10) // Increase the number of visible categories by 10
    }

    const handleCategoryItemClick = (category) => {
        setSelectedCategory(category)
        setCategoryDropdownOpen(false)
    }

    const handleLocalStore = (appName) => {
        localStorage.setItem('selectedAppName', appName)
    }

    return (
        <>
            {' '}
            <MetaHeadComp
                metaData={metaData}
                page={'/integration'}
                pathArray={pathArray}
            />
            <div className="pt-14">
                {/* nav start */}
                {/* <div className="bg-[#00A68B] pt-6">
        <div className="flex flex-row justify-between items-center container bg-[#f5f5f5] py-4 px-6 rounded-lg">
        <div className='flex gap-1 items-center'>
            <Image
              className='w-[26px] h-[26px]'
              src={
                plugin?.iconurl
                  ? plugin?.iconurl
                  : "https://placehold.co/40x40"
              }
              width={40}
              height={40}
            />
            <h6 className='text-2xl font-bold capitalize'>{plugin?.name}</h6>
          </div>
        </div>
      </div> */}
                <div className="flex flex-col gap-6 container pt-10">
                    <h1 className="lg:text-5xl text-3xl  font-bold">
                        5000+ viaSocket Integrations
                    </h1>
                    <p className="text-lg  lg:w-[900px] ">
                        Viasocket is your all-in-one solution, seamlessly
                        integrating CRM, Marketing, E-Commerce, Helpdesk,
                        Payments, Web forms, Collaboration, and more for
                        streamlined business success.
                    </p>
                </div>
                <div className=" ">
                    <div className="container">
                        <IntegrationSearch
                            loading={loading}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            renderFilterOptions={renderFilterOptions}
                            isCategoryDropdownOpen={isCategoryDropdownOpen}
                            handleCategoryClick={handleCategoryClick}
                            selectedCategory={selectedCategory}
                            handleCategoryItemClick={handleCategoryItemClick}
                            filteredData={filteredData}
                            handleLocalStore={handleLocalStore}
                            visibleItems={visibleItems}
                            apps={apps}
                            handleLoadMore={handleLoadMore}
                            uniqueCategories={uniqueCategories}
                            visibleCategories={visibleCategories}
                            handleCategoryLoadMore={handleCategoryLoadMore}
                            pathArray={pathArray}
                        />
                    </div>
                </div>

                <div className="container py-8">
                    {getStartedData && (
                        <GetStarted data={getStartedData} isHero={'false'} />
                    )}
                </div>
                {/* footer */}

                {/* <div className="bg-[#E6E6E6] py-10">
        <div className="flex flex-row gap-4 justify-center items-center">
          <h4 className="lg:text-[32px] md:text-xl text-lg font-semibold">
            Integrations run at
          </h4>
          <Image
            src="../../../assets/brand/socket_fav_dark.svg"
            width={40}
            height={40}
          />
        </div>
      </div> */}

                {/* ------------------------------------------------------------------------------------------------------ */}
            </div>
        </>
    )
}

export default IntegrationSlugPage

export async function getServerSideProps(context) {
    const { currentcategory } = context.query

    const pathArray = ['', 'integration']

    const fetchUrl =
        currentcategory && currentcategory !== 'All'
            ? `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?category=${
                  currentcategory && currentcategory === 'Other'
                      ? null
                      : currentcategory
              }&limit=200`
            : `${process.env.NEXT_PUBLIC_INTEGRATION_URL}/all?limit=200`

    const apiHeaders = {
        headers: {
            'auth-key': process.env.NEXT_PUBLIC_INTEGRATION_KEY,
        },
    }

    const response = await fetch(fetchUrl, apiHeaders)
    const responseData = await response.json()

    const IDs = ['tbl2bk656', 'tblvgm05y']

    const dataPromises = IDs.map((id) => getDbdashData(id))
    const results = await Promise.all(dataPromises)

    return {
        props: {
            metaData: results[0].data.rows,
            getStartedData: results[1].data.rows,
            responseData,
            pathArray,
        },
    }
}
