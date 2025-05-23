import React from 'react'
import { CiSearch } from "react-icons/ci";
import { Button } from "@/components/ui/button"

const SearchPopup = () => {
  return (
    <div className="h-full w-full bg-[#0003] absolute top-0 left-0 z-50  flex flex-col justify-center items-center">
      <div className='relative flex flex-col justify-start items-start w-full max-w-[700px] bg-[#fff] h-[80%] gap-0'>
        <div className='flex flex-col justify-start items-start px-8 py-3 w-full  border-b border-[#0000001a]'>
          <h1>Select Products</h1>
        </div>
        <div className='relative flex flex-col justify-start items-start px-8 py-3 w-full  border-b border-[#0000001a] gap-0'>
          <input
            type="input"
            placeholder="Search Product"
            className="w-full p-1.5 pl-10 border border-[#0003] rounded focus:outline-none focus:border-[#000]  placeholder:text-[#0003] shadow"
          />
          <CiSearch className="absolute left-10 top-1/2 -translate-y-1/2 text-[#0003] h-[20px] w-[20px]" />
        </div>
        <div className='absolute bottom-0 flex flex-row justify-between items-center px-8 py-3 w-full'>
          <h1>Select Products</h1>
          <div className='w-[50%] flex flex-row justify-end items-center gap-3'>
            <Button
              className="text-[#0006] bg-transparent border border-[#0006] font-semibold text-[14px] px-4 py-2 rounded-md cursor-pointer"
            >
              Cancle
            </Button>
            <Button
              className="text-[#008060] bg-transparent border border-[#008060] font-semibold text-[14px] px-4 py-2 rounded-md hover:bg-[#008060] hover:text-[#fff] cursor-pointer"
            >
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPopup
