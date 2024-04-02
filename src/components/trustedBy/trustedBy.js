import { getDbdashData } from '@/pages/api'
import Image from 'next/image'

export default function TrustedBy(products) {
    return (
        <>
            <div className="grid gap-3">
                <span className="text-xl font-medium text-gray-400">
                    Trusted By
                </span>
                <div className="flex gap-5 flex-wrap">
                    {products &&
                        products?.data.map((img, index) => {
                            return (
                                <>
                                    {img?.icon[0] && (
                                        <Image
                                            key={index}
                                            className="h-[20px] w-[auto] "
                                            src={img.icon[0]}
                                            width={100}
                                            height={20}
                                            alt={img?.name}
                                        />
                                    )}
                                </>
                            )
                        })}
                </div>
            </div>
        </>
    )
}
