import { listPostContent, countPosts } from '../../../components/lib/posts'
// import { listTags } from "../../../components/lib/tags";
import Layout from '../../../components/blogs/layout'
import PostList from '../../../components/blogs/postList'
import config from '../../../components/lib/config'
// import TagPostList from '@/components/tagPostList';
import Head from 'next/head'
export default function Index({ posts, tags, pagination }) {
    const title = 'Unleash the Power of Seamless API Development'
    return (
        <>
            <Layout>
                <Head>
                    <title>{title}</title>
                </Head>
                <PostList posts={posts} tags={tags} pagination={pagination} />
                {/* <TagPostList post ={posts} tags={tags} pagination={pagination} /> */}
            </Layout>
        </>
    )
}

export async function getStaticProps({ params }) {
    const page = parseInt(params.page)
    const posts = listPostContent(page, config.posts_per_page)
    const pagination = {
        current: page,
        pages: Math.ceil(countPosts() / config.posts_per_page),
    }
    return {
        props: {
            page,
            posts,
            // tags,
            pagination,
        },
    }
}
export const getStaticPaths = async () => {
    const pages = Math.ceil(countPosts() / config.posts_per_page)
    const paths = Array.from(Array(pages - 1).keys()).map((it) => ({
        params: { page: (it + 2).toString() },
    }))
    return {
        paths: paths,
        fallback: false,
    }
}
