import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { MdArrowBackIos, MdOutlineKeyboardArrowDown } from 'react-icons/md'
import Footer from '../footer/footer'

export default function ErrorComp({ pathArray }) {
    const router = useRouter()
    const openChatWidget = () => {
        window.chatWidget.open()
    }
    var showNav = false
    if (pathArray[1] && pathArray[1] === 'integration') {
        showNav = true
    }

    return (
        <>
            <div>
                {showNav && (
                    <div className="flex justify-between container my-4">
                        <Image
                            src="/assets/brand/logo.svg"
                            width={540}
                            height={540}
                            alt="viasocket logo"
                            className="h-[40px] w-auto"
                        />
                        <div className="dropdown dropdown-bottom dropdown-hover">
                            <div
                                tabIndex={0}
                                role="button"
                                className="flex items-center gap-1"
                            >
                                Support
                                <MdOutlineKeyboardArrowDown size={20} />
                            </div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                            >
                                <button
                                    onClick={openChatWidget}
                                    aria-label="Chat"
                                    className="text-start px-4 py-2 hover:bg-[##E5E5E1] rounded-lg"
                                >
                                    Live Chat
                                </button>
                                <li>
                                    <Link
                                        target="_blank"
                                        href="https://calendly.com/rpaliwal71/15-mins?month=2024-03"
                                    >
                                        Book a meeting
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        target="_blank"
                                        href="https://viasocket.com/faq"
                                    >
                                        Help Doc
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
                <div className="flex flex-col items-center justify-center py-6 w-dvw px-2">
                    <Image
                        src="/assets/img/404.svg"
                        width={1080}
                        height={1080}
                        className="md:w-2/3 lg:w-1/3 w-full h-auto"
                        alt="404 Image"
                    />
                    <div className="flex flex-col items-center gap-6">
                        <h1 className="md:text-3xl text-xl text-center font-semibold">
                            The page you're trying to reach isn't available or
                            doesn't exist.
                        </h1>
                        <div className="flex gap-4">
                            <button
                                className="btn btn-accent btn-md"
                                onClick={() => router.back()}
                            >
                                <MdArrowBackIos />
                                Back
                            </button>
                            <Link href="/">
                                <button className="btn btn-md btn-accent btn-outline">
                                    Go to home
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                {showNav && <Footer />}
            </div>
        </>
    )
}
