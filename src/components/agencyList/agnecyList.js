import Link from "next/link";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import Image from "next/image";
import { MdOutlineVerified } from "react-icons/md";
import Script from "next/script";

const AgencyList = ({ agencies, type }) => {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const paginatedAgencies = agencies.slice(offset, offset + itemsPerPage);
  return (
    <>
      <div className="grid row-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {paginatedAgencies &&
          paginatedAgencies.map((agency, index) => {
            if (
              (type === "verified" && agency?.verified) ||
              (type === "nonverified" && agency?.verified == null)
            ) {
              return (
                <div className="" key={index + offset}>
                  <div className="flex flex-col col-span-1 bg-white border rounded-md overflow-hidden  border-slate-200 relative h-full">
                    {agency?.verified && (
                      <MdOutlineVerified
                        className="absolute right-2 top-2"
                        color="#2A81FC"
                      />
                    )}
                    <div
                      style={{
                        backgroundColor: agency?.background_color
                          ? agency.background_color
                          : "#F5F5F5",
                      }}
                      className={` p-4 h-[60px]`}
                    >
                      {agency?.logo ? (
                        <Image
                          className="w-auto h-full"
                          src={agency?.logo[0]}
                          width={1080}
                          height={1080}
                          alt="img"
                        />
                      ) : (
                        <h3 className="text-sm">{agency?.name}</h3>
                      )}
                    </div>
                    <div className="p-3 grid gap-1 h-full">
                      <h2 className="text-xl">{agency?.name}</h2>
                      <p className="text-slate-400 font-light text-sm">
                        {agency?.website ? agency?.website : "-"}
                      </p>
                      <p className=" text-slate-400 font-light text-sm ">
                        {agency?.location ? agency?.location : "-"}
                      </p>
                      <button
                        onClick={() => {
                          window.iframeController();
                        }}
                        className="col-link text-blue-500 text-sm text-start"
                      >
                        Schedule a meet {">"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            }
          })}
      </div>
      <ReactPaginate
        pageCount={Math.ceil(agencies.length / itemsPerPage)}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
        forcePage={currentPage}
      />
      <Script
        id="interface-main-script"
        embedToken={process.env.NEXT_PUBLIC_INTERFACE_TOKEN}
        src="https://interface-embed.viasocket.com/interface-prod.js"
      ></Script>
    </>
  );
};

export default AgencyList;
