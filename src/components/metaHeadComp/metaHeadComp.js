import Head from 'next/head'

export default function MetaHeadComp({ metaData, page, pathArray }) {
    if (metaData) {
        let meta = metaData.find((item) => item.name === page)
        let title, description

        if (meta?.name === page) {
            title = meta?.title
            description = meta?.description

            if (meta?.dynamic) {
                title = title.replace(
                    /\[AppOne\]|\[AppTwo\]/g,
                    function (match) {
                        return match === '[AppOne]'
                            ? pathArray[2]
                            : pathArray[3]
                    }
                )
                description = description.replace(
                    /\[AppOne\]|\[AppTwo\]/g,
                    function (match) {
                        return match === '[AppOne]'
                            ? pathArray[2]
                            : pathArray[3]
                    }
                )
            }

            return (
                <>
                    <Head>
                        <title>{title && title}</title>
                        <meta
                            name="description"
                            content={description && description}
                        />
                        <link
                            rel="icon"
                            type="image/x-icon"
                            href="/assets/brand/fav_ico.svg"
                        />
                    </Head>
                </>
            )
        }
    }
}
