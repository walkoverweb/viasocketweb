import Link from 'next/link'
import { getDbdashData } from './api'
import AgencyList from '@/components/agencyList/agnecyList'
import Script from 'next/script'
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp'

export const config = {
    runtime: 'experimental-edge',
  }


export async function getServerSideProps() {
    const IDs = ['tblajmg8e', 'tblmsw3ci', 'tbl2bk656']

    const dataPromises = IDs.map((id) => getDbdashData(id))
    const results = await Promise.all(dataPromises)

    return {
        props: {
            agencies: results[0].data.rows,
            rawPageData: results[1].data.rows,
            metaData: results[2].data.rows,
        },
    }
}

const Experts = ({ agencies, rawPageData, pathArray, metaData }) => {
    let pageData = rawPageData.find(
        (page) => page?.name?.toLowerCase() === pathArray[1]
    )
    const expertsHelp = [
        {
            help: 'Partner agencies collaborate with viaSocket users to streamline your workflows.',
        },
        {
            help: 'Partner assess your needs, design custom automation using viaSocket.',
        },
        {
            help: 'Partner implement also can provide training for viaSocket automation.',
        },
        {
            help: 'Ongoing support ensures your optimize and scale automation efforts.',
        },
    ]

    let verifiedArr = []
    let nonVerifiedArr = []

    // Iterate through the objects and categorize them
    if (agencies.length > 0) {
        agencies.forEach((obj) => {
            switch (obj.verified) {
                case true:
                    verifiedArr.push(obj)
                    break

                default:
                    nonVerifiedArr.push(obj)
                    break
            }
        })
    }
    return (
        <>
            <MetaHeadComp
                metaData={metaData}
                page={'/experts'}
                pathArray={pathArray}
            />

            <div id="iframe-parent-container" class="popup-parent-container">
                <div className="header">
                    <h4 id="title">Title</h4>
                </div>
                <iframe id="iframe-component" title="iframe"></iframe>
            </div>
            {/* </div> */}

            <button
                id="interfaceEmbed"
                class="popup-interfaceEmbed"
                aria-label="interface"
            >
                Interface
            </button>
            <div className="container">
                <div className=" grid mt-14 gap-8 w-full  md:pt-24 pt-24 ">
                    {pageData?.h3 && (
                        <h3 className="text-2xl">{pageData?.h3}</h3>
                    )}
                    <div className="grid gap-2 md:w-5/6 w=1/1">
                        {pageData?.h1 && (
                            <h1 className="md:text-6xl text-4xl font-medium ">
                                {pageData?.h1}
                            </h1>
                        )}
                        {pageData?.h2 && (
                            <h3 className="text-2xl">{pageData?.h2}</h3>
                        )}
                    </div>
                </div>

                <div className="grid gap-8">
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mt-20 text-[#415765]">
                        Verified automation agencies by viaSocket
                    </h2>
                    {verifiedArr.length > 0 && (
                        <AgencyList agencies={verifiedArr} type={'verified'} />
                    )}
                    <div className="mt-10 text-center"></div>
                </div>
                <div className="grid gap-8">
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mt-20 text-[#415765]">
                        Non-verified automation agencies
                    </h2>
                    {nonVerifiedArr.length > 0 && (
                        <AgencyList
                            agencies={nonVerifiedArr}
                            type={'nonverified'}
                        />
                    )}
                    <div className="mt-10 text-center">
                        <button
                            className="px-3.5 sm:px-6 py-4 font-bold text-xs sm:text-lg md:text-xl  lg:text-2xl border border-black text-black rounded"
                            aria-label="Suggest an agency or get listed if you are one"
                        >
                            Suggest an agency or get listed if you are one
                        </button>
                    </div>
                </div>
                <h2
                    className="text-base sm:text-xl lg:text-2xl mt-6 block underline text-[#415765]"
                    rel="stylesheet"
                    href="#"
                >
                    How experts can help?
                </h2>
                <div className="mt-6 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-center md:justify-start gap-6">
                    {expertsHelp &&
                        expertsHelp.map((expertsHelp, index) => {
                            return (
                                <Link
                                    rel="stylesheet"
                                    href={'#'}
                                    key={index}
                                    aria-label="expert"
                                >
                                    <p className="lg:p-6 p-4 border text-xl rounded  h-full  text-[#415765] border-black">
                                        {expertsHelp?.help}
                                    </p>
                                </Link>
                            )
                        })}
                </div>
            </div>
        </>
    )
}
export default Experts
