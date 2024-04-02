import { useLayoutEffect } from 'react'
import Image from 'next/image'
import { MdArrowForward } from 'react-icons/md'
import Link from 'next/link'
import { getDbdashData } from './api'
import MetaHeadComp from '@/components/metaHeadComp/metaHeadComp'

export const config = {
    runtime: 'experimental-edge',
  }

export async function getServerSideProps() {
    const IDs = ['tblvo36my', 'tbl2bk656']

    const dataPromises = IDs.map((id) => getDbdashData(id))
    const results = await Promise.all(dataPromises)

    return {
        props: {
            features: results[0].data.rows,
            metaData: results[1].data.rows,
        },
    }
}

const Login = ({ features, metaData, pathArray }) => {
    let featuresArrOne = []
    let featuresArrTwo = []
    features.map((feature) => {
        if (feature?.block_type !== 'R2C2' && feature?.onlogin) {
            featuresArrOne.push(feature)
        }
        if (feature?.block_type === 'R2C2' && feature?.onlogin) {
            featuresArrTwo.push(feature)
        }
    })
    useLayoutEffect(() => {
        const configuration = {
            referenceId: process.env.NEXT_PUBLIC_REFERENCE_ID,
            success: (data) => {
                console.log('success response', data)
            },
            failure: (error) => {
                console.log('failure reason', error)
            },
        }
        if (typeof window.initVerification === 'function') {
            window.initVerification(configuration)
        } else {
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src =
                'https://proxy.msg91.com/assets/proxy-auth/proxy-auth.js'

            const handleLoad = () => {
                if (typeof window.initVerification === 'function') {
                    window.initVerification(configuration)
                } else {
                    console.error('initVerification function not found')
                }
            }

            script.addEventListener('load', handleLoad)

            document.body.appendChild(script)

            return () => {
                document.body.removeChild(script)
                script.removeEventListener('load', handleLoad)
            }
        }
    }, [])

    return (
        <>
            <MetaHeadComp
                metaData={metaData}
                page={'/login'}
                pathArray={pathArray}
            />
            <div className="flex w-screen md:h-screen flex-col-reverse md:flex-row">
                <div className="md:w-3/5 w-full  py-6 px-3 md:p-10  flex flex-col gap-6">
                    <a href="/" aria-label="Logo viaSocket">
                        <Image
                            className="hidden md:block"
                            src="/assets/brand/logo.svg"
                            width={158.6}
                            height={40}
                            alt="viasocket"
                        />
                    </a>

                    <div className="  text-2xl font-bold">Features</div>
                    <div className=" grid  grid-cols-2 gap-6">
                        {featuresArrTwo.length > 0 &&
                            featuresArrTwo.map((feature) => {
                                {
                                    return (
                                        <div className="signup_img md:p-6 p-2 bg-[#D8E2DC] flex flex-col col-span-2 gap-6 rounded">
                                            <Image
                                                className=""
                                                src={
                                                    feature?.image[1]
                                                        ? feature.image[1]
                                                        : 'https://placehold.co/1200x400'
                                                }
                                                width={1000}
                                                height={800}
                                                alt="viasocket"
                                            />
                                            <p className=" font-medium text-black text-xl">
                                                {feature?.name}
                                            </p>
                                        </div>
                                    )
                                }
                            })}
                        {featuresArrOne.length > 0 &&
                            featuresArrOne.map((feature) => {
                                {
                                    return (
                                        <div className="md:p-6 p-2 bg-[#F7F7F8] flex flex-col  w-auto md:col-span-1 col-span-2">
                                            <Image
                                                src={
                                                    feature?.icon[0]
                                                        ? feature?.icon[0]
                                                        : '/assets/img/feature_ico.svg '
                                                }
                                                width={36}
                                                height={36}
                                                alt="feature_ico"
                                            />
                                            <div className="text-xl font-semibold my-3">
                                                {feature?.name}
                                            </div>
                                            <p>{feature?.description}</p>
                                        </div>
                                    )
                                }
                            })}
                    </div>

                    {/* <p className="font-medium flex items-center justify-end mt-6">
                        Read all latest release <MdArrowForward />
                    </p> */}
                </div>

                <div className="md:w-2/5 w-full bg-white  py-6 px-3 md:p-10 flex flex-col gap-4">
                    <a href="/" className="md:hidden block" aria-label="logo">
                        <Image
                            src="/assets/brand/logo.svg"
                            width={158.6}
                            height={40}
                            alt="viasocket"
                        />
                    </a>

                    <div className="text-2xl font-bold">Login</div>
                    <div
                        id={process.env.NEXT_PUBLIC_REFERENCE_ID}
                        className="loginBtn_google"
                    />
                    <div className="flex ">
                        <span className="text-sm">Create a new Account,</span>
                        <Link
                            href="/signup"
                            className="ms-1 text-sm text-sky-700"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login
