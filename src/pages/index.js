import TrustedBy from '@/components/trustedBy/trustedBy'
import Image from 'next/image'
import Link from 'next/link'
import { MdOutlineArrowForward } from 'react-icons/md'
import { getDbdashData } from './api/index'
import { MdArrowForward } from 'react-icons/md'
import GetStarted from '@/components/getStarted/getStarted'
import { FeaturesGrid } from '@/components/featureGrid/featureGrid'
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp'

export const config = {
    runtime: 'experimental-edge',
  }

export async function getServerSideProps() {
    const IDs = [
        'tblogeya1',
        'tblwql8n1',
        'tblwoqytc',
        'tblvgm05y',
        'tblmsw3ci',
        'tblsaw4zp',
        'tblvo36my',
        'tbl2bk656',
    ]

    const dataPromises = IDs.map((id) => getDbdashData(id))
    const results = await Promise.all(dataPromises)

    return {
        props: {
            products: results[0].data.rows,
            testimonials: results[1].data.rows,
            caseStudies: results[2].data.rows,
            getStartedData: results[3].data.rows,
            productData: results[4].data.rows,
            trustedData: results[5].data.rows,
            features: results[6].data.rows,
            metaData: results[7].data.rows,
        },
    }
}

const Index = ({
    products,
    testimonials,
    caseStudies,
    getStartedData,
    productData,
    trustedData,
    features,
    metaData,
}) => {
    return (
        <>
            <MetaHeadComp metaData={metaData} page={'/'} />
            <div className="grid gap-20 ">
                <div className="flex flex-col gap-10 container lg:pb-8 pt-20 ">
                    <div className="grid gap-4 mt-auto">
                        {productData &&
                            productData.map((page) => {
                                if (page?.name === 'Index') {
                                    return (
                                        <>
                                            <h1 className="md:text-6xl text-4xl font-semibold">
                                                {page?.h1}
                                            </h1>
                                            <h2 className="text-2xl w-3/4">
                                                {page?.h2}
                                            </h2>
                                        </>
                                    )
                                }
                            })}
                    </div>
                    {getStartedData && (
                        <GetStarted data={getStartedData} isHero={'true'} />
                    )}

                    <TrustedBy data={trustedData} />
                </div>

                <div className="container grid gap-10">
                    <h2 className="font-inter text-3xl font-semibold leading-9 tracking-normal text-left">
                        Meet our automation products
                    </h2>
                    <div className=" grid md:grid-cols-2 grid-cols-1 md:flex-row lg:gap-16 md:gap-8 gap-8  items-center justify-center ">
                        {products &&
                            products.map((product, index) => {
                                return (
                                    <Link
                                        href={`/${product?.name && product.name}`}
                                        target="_blank"
                                        className="flex items-center justify-center w-full h-full"
                                        aria-label="products"
                                    >
                                        <div
                                            className="flex flex-col bg-white rounded-md overflow-hidden max-w-[400px] md:max-w-full w-full h-full hover:drop-shadow-lg"
                                            key={index}
                                        >
                                            <div className="p-6 grid gap-2 h-full">
                                                <div className="flex items-center gap-2 ">
                                                    <Image
                                                        className="h-[40px]"
                                                        src={`/assets/brand/${product?.name}_ico.svg`}
                                                        width={36}
                                                        height={48}
                                                        alt={product?.name}
                                                    />
                                                    <p className="font-inter text-3xl font-semibold leading-11 text-left capitalize tracking-wide">
                                                        {product?.name}
                                                    </p>
                                                </div>
                                                <p className="font-inter lg:text-xl text-base font-normal leading-6 tracking-normal text-left">
                                                    {product?.description}
                                                </p>
                                                {/* If you need another Link here, ensure it follows the same pattern */}
                                                <button
                                                    className="flex items-center gap-1 text-[#0000ff]"
                                                    aria-label="Explore"
                                                >
                                                    Explore <MdArrowForward />
                                                </button>
                                            </div>
                                            <div className="pt-6 w-full ">
                                                <Image
                                                    className="w-full bg-[#F6F4EE]"
                                                    src={product.image[0]}
                                                    height={90}
                                                    width={80}
                                                    alt={product?.name}
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                    </div>
                </div>
                {features && (
                    <FeaturesGrid features={features} page={'overall'} />
                )}
                <div className="grid gap-10 container w">
                    <h2 className="font-inter text-3xl font-semibold leading-9 tracking-normal text-left ">
                        What clients says
                    </h2>
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8 w-full">
                        {testimonials &&
                            testimonials.map((testimonial, index) => {
                                return (
                                    <div
                                        className="flex flex-col rounded-md  p-8 gap-8 bg-[#FEFDFD] "
                                        key={index}
                                    >
                                        <p className="font-inter text-lg font-normal leading-[32px] tracking-normal text-left ">
                                            " {testimonial?.testimonial}"
                                        </p>
                                        <div className="flex items-center gap-2 mt-auto">
                                            <Image
                                                className="rounded-full"
                                                src={testimonial?.client_img[0]}
                                                width={36}
                                                height={36}
                                                alt={testimonial?.given_by}
                                            />
                                            <div>
                                                <p className="font-inter  font-semibold leading-4 tracking-normal text-left">
                                                    {testimonial?.given_by}
                                                </p>
                                                <p className="font-inter text-sm font-normal leading-4 tracking-normal text-left pt-1 text-gray-400">
                                                    {testimonial?.giver_title}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                    </div>
                </div>
                <div className="grid container gap-10">
                    <h2 className="font-inter text-3xl font-semibold leading-9 tracking-normal text-left ">
                        Client Stories
                    </h2>

                    <div className="grid  grid-rows-6 grid-cols-6 gap-6 container md:max-h-[700px] ">
                        {caseStudies &&
                            caseStudies.map((caseStudy, index) => {
                                if (caseStudy?.priority == 1) {
                                    return (
                                        <>
                                            <Link
                                                href={
                                                    caseStudy?.link &&
                                                    caseStudy?.link
                                                }
                                                target="_blank"
                                                className="lg:row-span-6 lg:col-span-3 md:row-span-3 md:col-span-6 row-span-2 col-span-6 bg-white flex flex-col md:flex-row lg:flex-col items-center rounded-md overflow-hidden hover:drop-shadow-lg"
                                                aria-label="casestudy"
                                            >
                                                <div className="casestudy_img w-full h-full">
                                                    <Image
                                                        src={
                                                            caseStudy?.image[0]
                                                        }
                                                        width={1080}
                                                        height={1080}
                                                        alt={caseStudy?.title}
                                                    />
                                                </div>
                                                <div className="grid p-4">
                                                    <p>{caseStudy?.title}</p>
                                                    <Link
                                                        target="_blank"
                                                        href={
                                                            caseStudy?.link &&
                                                            caseStudy?.link
                                                        }
                                                        className="flex items-center gap-1 text-[#0000ff] mt-6"
                                                        aria-label="case study"
                                                    >
                                                        Learn More{' '}
                                                        <MdOutlineArrowForward />
                                                    </Link>
                                                </div>
                                            </Link>
                                        </>
                                    )
                                } else {
                                    return (
                                        <>
                                            <Link
                                                target="_blank"
                                                href={caseStudy?.link}
                                                className="lg:row-span-3 lg:col-span-3 md:row-span-3 md:col-span-3 row-span-2 col-span-6 bg-white flex flex-col  lg:flex-row  lg:items-center items-start rounded-md overflow-hidden justify-center hover:drop-shadow-lg"
                                            >
                                                <div className="casestudy_img w-full h-full ">
                                                    <Image
                                                        src={
                                                            caseStudy?.image[0]
                                                        }
                                                        height={1080}
                                                        width={1080}
                                                        alt={caseStudy?.title}
                                                    />
                                                </div>
                                                <div className="w-fit h-fit xl:min-w-[360px] lg:min-w-[260px] p-4">
                                                    <p>{caseStudy?.title}</p>
                                                    <Link
                                                        target="_blank"
                                                        href={caseStudy?.link}
                                                        className="flex items-center gap-1 text-[#0000ff] mt-6"
                                                    >
                                                        Learn More{' '}
                                                        <MdOutlineArrowForward />
                                                    </Link>
                                                </div>
                                            </Link>
                                        </>
                                    )
                                }
                            })}
                    </div>
                </div>

                {getStartedData && (
                    <div className="container">
                        <GetStarted data={getStartedData} isHero={'false'} />
                    </div>
                )}
            </div>
        </>
    )
}

export default Index
