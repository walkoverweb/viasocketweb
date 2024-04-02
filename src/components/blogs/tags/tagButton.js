import Link from 'next/link'
export default function TagButton({ tag }) {
    return (
        <>
            <Link
                legacyBehavior
                href={'/blog/tags/[[...slug]]'}
                as={`/blog/tags/${tag}`}
                aria-label="blog"
            >
                {tag}
            </Link>
        </>
    )
}
