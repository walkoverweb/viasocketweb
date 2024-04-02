import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

const IntegrationSearch = ({
    loading,
    selectedApp,
    searchTerm,
    setSearchTerm,
    renderFilterOptions,
    isCategoryDropdownOpen,
    handleCategoryClick,
    selectedCategory,
    filteredData,
    handleLocalStore,
    visibleItems,
    apps,
    handleLoadMore,
    uniqueCategories,
    visibleCategories,
    handleCategoryLoadMore,
    pathArray,
}) => {
    const noAppsFoundMessage =
        filteredData.length === 0
            ? "Can't find what you need? Let us know what you're looking for! We're always looking to expand our collection. Request an app here"
            : ''
    const [isDataLoading, setIsDataLoading] = useState(true)

    useEffect(() => {
        setIsDataLoading(loading)
    }, [loading])

    const handleCategoryItemClick = (category) => {
        // Update selected category immediately upon click
        handleCategoryClick()
        selectedCategory(category) // Update selected category
    }

    const openChatWidget = () => {
        window.chatWidget.open()
    }
    // const handleCategoryLoadMore = () => {
    //   setVisibleCategories(visibleCategories + 10); // Increase the number of visible categories by 10
    // };

    return (
        <div>
            <div className="flex lg:flex-row flex-col lg:gap-14 gap-5 pb-6 pt-8 ">
                {/* category starts  here */}
                <div className="flex lg:flex-col sm:flex-row gap-4 lg:items-start items-center md:py-10 ">
                    <p className="lg:text-2xl md:text-xl text-lg font-medium">
                        Category
                    </p>
                    <div className="lg:flex flex-col lg:w-[240px] md:w-[240px] hidden gap-4">
                        {renderFilterOptions()}
                        {uniqueCategories.length > visibleCategories && (
                            <button
                                onClick={handleCategoryLoadMore}
                                className="text-blue-500 font-medium cursor-pointer text-left"
                                aria-label="load more categories"
                            >
                                Load More
                            </button>
                        )}
                    </div>

                    <div className="dropdown dropdown-bottom lg:hidden sm:block w-[100px]">
                        <div
                            tabIndex={0}
                            role="button"
                            className="bg-white flex justify-between items-center border border-[#CCCCCC] px-5 py-3 rounded  w-48"
                            onClick={() => {
                                handleCategoryClick()
                                setIsDataLoading(false)
                            }}
                        >
                            <span>
                                {selectedCategory || 'Select Category'}{' '}
                            </span>
                            <MdOutlineKeyboardArrowDown size={20} />
                        </div>
                        {isCategoryDropdownOpen && (
                            <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu  py-4 shadow bg-white border-[#f5f5f5] rounded-md w-48"
                            >
                                {renderFilterOptions().map((category) => (
                                    <li
                                        key={category}
                                        onClick={() => {
                                            handleCategoryItemClick(category)
                                            category === selectedCategory
                                                ? setIsDataLoading(false)
                                                : ''
                                        }}
                                        className={`cursor-pointer ${
                                            selectedCategory === category
                                                ? 'font-bold'
                                                : 'font-normal'
                                        }`}
                                    >
                                        {category === 'Null'
                                            ? 'Other'
                                            : category}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* search items */}
                <div className="flex flex-col gap-4 min-h-[380px] h-full">
                    <div className="lg:w-[500px] md:w-[400px] w-[250px]  lg:py-10 md:py-4 ">
                        <label className="input border-[#CCCCCC] flex items-center gap-2 bg-white rounded">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="w-4 h-4 opacity-70"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <input
                                type="text"
                                className="grow"
                                placeholder="Search integrations"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </label>
                    </div>
                    {isDataLoading ? (
                        <>
                            <div className=" flex flex-row flex-wrap gap-5">
                                {Array.from({ length: 25 }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-row justify-center items-center gap-2 px-5 py-3 rounded border border-[#CCCCCC] bg-white animate-pulse"
                                    >
                                        <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
                                        {/* Placeholder for icon */}
                                        <div className="h-4 w-20 bg-gray-300 rounded"></div>
                                        {/* Placeholder for text */}
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            {noAppsFoundMessage && (
                                <div className="flex flex-col gap-4">
                                    <p className="text-red-500 font-semibold text-xl">
                                        {noAppsFoundMessage}
                                    </p>
                                    <div>
                                        <button
                                            className="px-4 py-2 border border-[#CCCCCC] rounded"
                                            onClick={openChatWidget}
                                            aria-label="live chat"
                                        >
                                            Live Chat
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-row flex-wrap gap-5">
                                {filteredData?.length > 0 &&
                                    filteredData
                                        .slice(0, visibleItems)
                                        .map((app) => {
                                            const isSameAsSelected =
                                                selectedApp !== app?.appslugname

                                            if (isSameAsSelected) {
                                                return (
                                                    <a
                                                        key={app?.rowid}
                                                        href={
                                                            app?.appslugname
                                                                ? `/integration${pathArray[2] ? '/' + pathArray[2] : ''}/${app?.appslugname}`
                                                                : `/noplugin`
                                                        }
                                                        target={
                                                            pathArray[2]
                                                                ? '_self'
                                                                : '_blank'
                                                        }
                                                        rel="noopener noreferrer"
                                                        aria-label="apps"
                                                    >
                                                        <div
                                                            className="flex flex-row justify-center items-center gap-2 px-5 py-3 rounded border border-[#CCCCCC] bg-white"
                                                            onClick={() =>
                                                                handleLocalStore(
                                                                    app?.name
                                                                )
                                                            }
                                                        >
                                                            {app?.iconurl && (
                                                                <Image
                                                                    src={
                                                                        app?.iconurl
                                                                    }
                                                                    alt={
                                                                        app?.name
                                                                    }
                                                                    height={23}
                                                                    width={23}
                                                                />
                                                            )}

                                                            <h5 className="text-base font-medium">
                                                                {app?.name}
                                                            </h5>
                                                        </div>
                                                    </a>
                                                )
                                            }
                                        })}
                            </div>
                        </>
                    )}

                    <div>
                        {visibleItems < filteredData.length &&
                            !loading &&
                            !noAppsFoundMessage && (
                                <button
                                    onClick={handleLoadMore}
                                    className="font-medium text-[#2D81F7]"
                                    aria-label="load more apps"
                                >
                                    Load More...
                                </button>
                            )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IntegrationSearch
