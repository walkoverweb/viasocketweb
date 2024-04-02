import { getDbdashData } from '@/pages/api'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
// import AlphabeticalComponent from '../alphabetSort/alphabetSort'

const Footer = () => {
    const [data, setData] = useState(null)
    useEffect(() => {
        getDbdashDataa()
    }, [])

    const getDbdashDataa = async () => {
        const dbdashData = await getDbdashData('tbl6u2cba')
        setData(dbdashData.data.rows)
    }

    const groupedData = data?.reduce((acc, obj) => {
        const groupName = obj.group_name
        if (obj?.hidden === null) {
            if (!acc[groupName]) {
                acc[groupName] = []
            }
            acc[groupName].push(obj)
        }

        return acc
    }, {})

    const renderedGroups =
        groupedData &&
        Object.entries(groupedData).map(([groupName, items]) => {
            if (items.length > 0) {
                return (
                    <div className="flex flex-col gap-4 w-full" key={groupName}>
                        <h2 className="font-bold">{groupName}</h2>
                        <div className="flex flex-col gap-3">
                            {items.map(
                                (item, index) =>
                                    !item.hidden && (
                                        <Link
                                            target="_blank"
                                            href={
                                                item?.link
                                                    ? item.link
                                                    : `/${item?.name.toLowerCase().replace(/\s+/g, '-')}`
                                            }
                                            key={index}
                                            aria-label={item?.name}
                                        >
                                            {item?.name}
                                        </Link>
                                    )
                            )}
                        </div>
                    </div>
                )
            }
        })
    return (
        <>
            {/* {showAppsByTitle && (
                <div className="container mt-20">
                    <h1 className="text-base font-medium text-center py-4">
                        Apps by title
                    </h1>
                    <AlphabeticalComponent />
                </div>
            )} */}

            <div className="container flex sm:flex-row flex-col-reverse my-12 py-8 gap-12 ">
                <div className="flex w-full lg:max-w-[260px] md:max-w-[140px] max-w-[200px] flex-col justify-between ">
                    <div className="flex flex-col gap-2">
                        <Link href="/" aria-label="socket fav icon">
                            <Image
                                src="/assets/brand/socket_fav_dark.svg"
                                width={46}
                                height={46}
                                alt="socket fav icon"
                            />
                        </Link>

                        <p> © 2024 viaSocket</p>
                        <p>All rights reserved.</p>
                    </div>
                    <div className="flex items-center  gap-2 w-full flex-wrap">
                        <span>A product of</span>
                        <Link
                            href="https://walkover.in/"
                            target="_blank"
                            aria-label="walkover"
                        >
                            <Image
                                src="/assets/brand/walkover.svg"
                                alt="walkover"
                                width={100}
                                height={20}
                            />
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 gap-8  flex-wrap w-full">
                    {renderedGroups}
                </div>
            </div>
        </>
    )
}
export default Footer
