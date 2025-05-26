import React, { useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { Button } from "@/components/ui/button"


const sampleResponse = [
  {
    "id": 77,
    "title": "Fog Linen Chambray Towel - Beige Stripe",
    "variants": [
      {
        "id": 1,
        "product_id": 77,
        "title": "XS / Silver",
        "price": "49"
      },
      {
        "id": 2,
        "product_id": 77,
        "title": "S / Silver",
        "price": "49"
      },
      {
        "id": 3,
        "product_id": 77,
        "title": "M / Silver",
        "price": "49"
      }
    ],
    "image": {
      "id": 266,
      "product_id": 77,
      "src": "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/77/images/266/foglinenbeigestripetowel1b.1647248662.386.513.jpg?c=1"
    }
  },
  {
    "id": 80,
    "title": "Orbit Terrarium - Large",
    "variants": [
      {
        "id": 64,
        "product_id": 80,
        "title": "Default Title",
        "price": "109"
      }
    ],
    "image": {
      "id": 272,
      "product_id": 80,
      "src": "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/80/images/272/roundterrariumlarge.1647248662.386.513.jpg?c=1"
    }
  }
]


const SearchPopup = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(sampleResponse);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchTerm.trim() === '') {
        setFilteredProducts(sampleResponse);
      } else {
        const lowerTerm = searchTerm.toLowerCase();
        const filtered = sampleResponse.filter(product =>
          product.title.toLowerCase().includes(lowerTerm) ||
          product.variants.some(v => v.title.toLowerCase().includes(lowerTerm))
        );
        setFilteredProducts(filtered);
      }
    }, 300); // debounce delay: 300ms

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <div className="fixed inset-0 z-50 bg-[#0003] flex justify-center items-center overflow-hidden">
  <div className='relative flex flex-col justify-start items-start w-full max-w-[700px] bg-white max-h-[90vh]'>
    
    {/* Header */}
    <div className='flex flex-col justify-start items-start px-8 py-3 w-full border-b border-[#0000001a]'>
      <h1 className='text-[18px] font-medium'>Select Products</h1>
    </div>

    {/* Search */}
    <div className='relative flex flex-col justify-start items-start px-8 py-3 w-full border-b border-[#0000001a]'>
      <input
        type="text"
        placeholder="Search Product"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-1.5 pl-10 border border-[#0003] rounded focus:outline-none focus:border-[#000] placeholder:text-[#0003] shadow"
      />
      <CiSearch className="absolute left-10 top-1/2 -translate-y-1/2 text-[#0003] h-[20px] w-[20px]" />
    </div>

    {/* Scrollable product list */}
    <div className='flex flex-col w-full overflow-y-auto px-0'>
      {filteredProducts.map(product => (
        <div key={product.id} className='flex flex-col justify-start items-center'>
          <div className='flex flex-row justify-start items-center w-full gap-3 border-b border-[#0003] px-8 py-3'>
            <input type="checkbox" className="w-[20px] h-[20px] border border-[#008060] rounded accent-[#008060]" />
            <img src={product.image.src} alt={product.title} className='w-[50px] h-[50px] object-cover rounded border' />
            <h4 className='font-normal text-[16px]'>{product.title}</h4>
          </div>
          {product.variants.map(variant => (
            <div key={variant.id} className='w-full border-b border-[#0003] flex justify-end'>
              <div className='w-[90%] flex flex-row justify-between items-center px-8 py-3 gap-3'>
                <div className='flex flex-row justify-center items-center gap-3'>
                  <input type="checkbox" className="h-[24px] w-[24px] border border-[#008060] rounded accent-[#008060]" />
                  <h4 className='font-normal text-[16px]'>{variant.title}</h4>
                </div>
                <div className='flex flex-row justify-center items-center gap-3'>
                  <h2 className='font-normal text-[16px]'>${variant.price}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>

    {/* Footer */}
    <div className='absolute bottom-0 left-0 right-0 flex flex-row justify-between items-center px-8 py-3 w-full border-t border-[#0000001a] bg-white'>
      <h1>Select Products</h1>
      <div className='w-[50%] flex flex-row justify-end items-center gap-3'>
        <Button className="text-[#0006] bg-transparent border border-[#0006] font-semibold text-[14px] px-4 py-2 rounded-md cursor-pointer hover:text-[#fff]">Cancel</Button>
        <Button className="text-white bg-[#008060] border border-[#008060] font-semibold text-[14px] px-4 py-2 rounded-md cursor-pointer hover:bg-[#006647]">Add</Button>
      </div>
    </div>
  </div>
</div>

  )
}

export default SearchPopup
