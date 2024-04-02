import Link from 'next/link'

const AlphabeticalComponent = () => {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

    return (
        <div className="">
            <div className="flex flex-row flex-wrap justify-center gap-4">
                {alphabets.map((alphabet) => (
                    <div key={alphabet} className="text-xl ">
                        <Link
                            href={`/find-apps/${alphabet.toLowerCase()}`}
                            aria-label="alphabet"
                        >
                            {alphabet}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AlphabeticalComponent
