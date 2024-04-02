import '@/scss/global.scss'

import Navbar from '@/components/navbar/navbar'
import { useRouter } from 'next/router'
import Footer from '@/components/footer/footer'
import { useEffect, useLayoutEffect } from 'react'

export default function MyApp({ Component, pageProps, pagesData }) {
    const router = useRouter()
    var browserPath = router.asPath
    useLayoutEffect(() => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://proxy.msg91.com/assets/proxy-auth/proxy-auth.js'

        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
            script.removeEventListener('load', handleLoad)
        }
    }, [])
    const rawpathArray = browserPath.split(/[?#]/)
    const pathArray = rawpathArray[0].split('/')
    var showNavbar = false
    if (
        browserPath !== '/login' &&
        browserPath !== '/signup' &&
        !browserPath.includes('/integration/')
    ) {
        showNavbar = true
    }

    useEffect(() => {
        const helloConfig = {
            widgetToken: 'a13cc',
        }

        const script = document.createElement('script')
        script.src =
            'https://control.msg91.com/app/assets/widget/chat-widget.js'
        //script.async = true;
        script.onload = () => initChatWidget(helloConfig, 50)

        document.head.appendChild(script)

        return () => {
            document.head.removeChild(script)
        }
    }, [])

    return (
        <>
            {showNavbar && (
                <Navbar
                    productData={pageProps?.productData}
                    pathArray={pathArray}
                    rawpathArray={rawpathArray}
                />
            )}
            <Component
                {...pageProps}
                pathArray={pathArray}
                rawpathArray={rawpathArray}
            />
            {showNavbar && <Footer />}
        </>
    )
}
