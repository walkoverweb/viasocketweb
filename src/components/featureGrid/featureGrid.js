import { HiOutlineComputerDesktop } from 'react-icons/hi2'
import styles from './featureGrid.module.scss'
import Link from 'next/link'
import Image from 'next/image'

export function FeaturesGrid({ features, page }) {
    return (
        <>
            <div className="grid gap-10 container">
                <h2 className="text-3xl font-semibold">Features</h2>

                <div className="grid xl:grid-cols-4 lg:grid-cols-3 lg:grid-rows-3 md:grid-cols-3 md:grid-rows-4 sm:grid-cols-2 sm:grid-rows-6 md:gap-5 gap-3  overflow-hidden ">
                    {features
                        .sort((a, b) => a.priority - b.priority)
                        .map((feature, index) => {
                            if (
                                feature?.product?.toLowerCase() === page &&
                                feature?.hidden !== true
                            ) {
                                if (feature.block_type === 'R2C2') {
                                    return (
                                        <Link
                                            key={index}
                                            href={
                                                feature?.link
                                                    ? feature?.link
                                                    : '#'
                                            }
                                            target="_blank"
                                            className={`${styles.r2c2} col-span-2 row-span-2  bg-[#d8e2dc] rounded-lg justify-between gap-4 w-full h-full flex flex-col md:aspect-square overflow-hidden hover:shadow-lg `}
                                            aria-label="feature"
                                        >
                                            <div className="flex flex-col gap-3 lg:p-5 md:p-3 p-3">
                                                {feature?.icon ? (
                                                    <Image
                                                        src={feature.icon[0]}
                                                        alt="feature 1"
                                                        className={` `}
                                                        height={40}
                                                        width={40}
                                                    />
                                                ) : (
                                                    <HiOutlineComputerDesktop
                                                        size={35}
                                                    />
                                                )}
                                                <div className="flex flex-col gap-2 justify-end">
                                                    <h1 className="md:text-xl text-lg font-semibold">
                                                        {feature.name}
                                                    </h1>
                                                    <p className="md:text-sm text-xs text-gray-500">
                                                        {feature?.description}
                                                    </p>
                                                </div>
                                            </div>

                                            <div
                                                className={`${styles.r2c2_img_cont} flex h-full justify-center items-end`}
                                            >
                                                {feature?.image ? (
                                                    <Image
                                                        src={feature.image[0]}
                                                        alt="feature 1"
                                                        className={`${styles.r2c2_img} p-2 md:p-6 lg:p-12`}
                                                        height={1080}
                                                        width={1080}
                                                    />
                                                ) : (
                                                    <Image
                                                        src="https://placehold.co/1600x1400"
                                                        alt="Placeholder"
                                                        className={`${styles.r2c2_img} `}
                                                        height={1080}
                                                        width={1080}
                                                    />
                                                )}
                                            </div>
                                        </Link>
                                    )
                                } else if (feature.block_type === 'R1C2') {
                                    return (
                                        <Link
                                            key={index}
                                            href={
                                                feature?.link
                                                    ? feature?.link
                                                    : '#'
                                            }
                                            target="_blank"
                                            className={`${styles.r1c2} bg-[#F7F7F8]  col-span-2 row-span-1 flex sm:flex-row flex-col rounded-lg w-full h-full hover:shadow-lg`}
                                            aria-label="feature"
                                        >
                                            <div className="flex flex-col gap-3 h-full justify-between  lg:p-5 md:p-3 p-3 sm:w-1/2 w-1/1">
                                                {feature?.icon ? (
                                                    <Image
                                                        src={feature.icon[0]}
                                                        alt="feature 1"
                                                        className={` `}
                                                        height={40}
                                                        width={40}
                                                    />
                                                ) : (
                                                    <HiOutlineComputerDesktop
                                                        size={35}
                                                    />
                                                )}
                                                <div className="flex flex-col gap-2 justify-end">
                                                    <h1 className="md:text-xl text-lg font-semibold">
                                                        {feature.name}
                                                    </h1>
                                                    <p className="md:text-sm text-xs text-gray-500">
                                                        {feature?.description}
                                                    </p>
                                                </div>
                                            </div>

                                            <div
                                                className={`${styles.r1c2_img_cont} flex justify-end items-end sm:w-1/2 w-1/1 h-auto`}
                                            >
                                                {feature?.image ? (
                                                    <Image
                                                        src={feature.image}
                                                        alt="feature 1"
                                                        className={`${styles.r1c2_img} `}
                                                        height={1080}
                                                        width={1080}
                                                    />
                                                ) : (
                                                    <Image
                                                        src="https://placehold.co/1600x1600"
                                                        alt="Placeholder"
                                                        className={`${styles.r1c2_img} `}
                                                        height={1080}
                                                        width={1080}
                                                    />
                                                )}
                                            </div>
                                        </Link>
                                    )
                                } else {
                                    return (
                                        <Link
                                            href={
                                                feature?.link
                                                    ? feature?.link
                                                    : '#'
                                            }
                                            key={index}
                                            target="_blank"
                                            aria-label="feature"
                                            className={`col-span-2 md:col-span-1 row-span-1 min-h-[200px] bg-[#F7F7F8] lg:p-5 md:p-3 p-3 rounded-lg justify-between gap-1  flex flex-col  md:aspect-square w-full h-full hover:shadow-lg`}
                                        >
                                            <div className="flex flex-col gap-3">
                                                {feature?.icon ? (
                                                    <Image
                                                        src={feature.icon[0]}
                                                        alt="feature 1"
                                                        className={` `}
                                                        height={40}
                                                        width={40}
                                                    />
                                                ) : (
                                                    <HiOutlineComputerDesktop
                                                        size={35}
                                                    />
                                                )}
                                            </div>

                                            <div className="flex flex-col gap-2 justify-end ">
                                                <h1 className="md:text-xl text-lg  font-semibold">
                                                    {feature.name}
                                                </h1>
                                                <p className="md:text-sm text-xs text-gray-500">
                                                    {feature?.description}
                                                </p>
                                            </div>
                                        </Link>
                                    )
                                }
                            }
                        })}
                </div>
            </div>
        </>
    )
}
