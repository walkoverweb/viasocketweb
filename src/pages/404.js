import ErrorComp from '@/components/404/404Comp'

const NoPage = ({ pathArray }) => {
    return (
        <>
            <ErrorComp pathArray={pathArray} />
        </>
    )
}
export default NoPage
