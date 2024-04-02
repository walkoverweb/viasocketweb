import { getDbdashData } from '@/pages/api'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NotificationBar() {
    const [data, setData] = useState(null)
    useEffect(() => {
        getDbdashDataa()
    }, [])

    const getDbdashDataa = async () => {
        const dbdashData = await getDbdashData('tblgw6ag9')
        setData(dbdashData.data.rows)
    }
    if (data && data[0]?.details) {
        return (
            <div className=" bg-accent p-2  w-full ">
                <div className="container flex flex-wrap items-center justify-center  ">
                    <Link
                        href={data[1]?.details && data[1]?.details}
                        target="_blank"
                        className=" text-white text-sm flex items-center flex-wrap gap-1"
                        aria-label="update"
                    >
                        <span className="bg-green-700  text-xs rounded-md px-2 h-fit">
                            Update
                        </span>
                        {data[0]?.details}{' '}
                        <div className="underline text-white text-xs">
                            Learn More
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}
