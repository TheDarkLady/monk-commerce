import React, { useState } from 'react'
import { RxDragHandleDots2 } from "react-icons/rx";
import SearchPopup from './searchPopup';
import {
    Table,
    TableBody,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
    TableCell
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MdModeEdit } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

const AddProductsDesktop = () => {
    const [count, setCount] = useState(1);
    const [showDiscounts, setShowDiscounts] = useState({});
    const [showPopup, setShowPopup] =  useState(false)
    // const [searchTerm, setSearchTerm] = useState("");
    // const [debouncedSearch, setDebouncedSearch] = useState("");
    // const [selectedProductMap, setSelectedProductMap] = useState({});
    // const [selectedProducts, setSelectedProducts] = useState(0);

    const increaseCount = () => setCount(prev => prev + 1);

    const decreaseCount = (index) => {
        if (count > 1) {
            setCount(prev => prev - 1);
            setShowDiscounts(prev => {
                const updated = { ...prev };
                delete updated[index];
                return updated;
            });
        }
    };
    

    // const productData = useMemo(() => [
    //     {
    //         id: 77,
    //         title: "Fog Linen Chambray Towel - Beige Stripe",
    //         variants: [
    //             { id: 1, product_id: 77, title: "XS / Silver", price: "49" },
    //             { id: 2, product_id: 77, title: "S / Silver", price: "49" },
    //             { id: 3, product_id: 77, title: "M / Silver", price: "49" }
    //         ],
    //         image: {
    //             id: 266,
    //             product_id: 77,
    //             src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/77/images/266/foglinenbeigestripetowel1b.1647248662.386.513.jpg?c=1"
    //         }
    //     },
    //     {
    //         id: 80,
    //         title: "Orbit Terrarium - Large",
    //         variants: [
    //             { id: 64, product_id: 80, title: "Default Title", price: "109" }
    //         ],
    //         image: {
    //             id: 272,
    //             product_id: 80,
    //             src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/80/images/272/roundterrariumlarge.1647248662.386.513.jpg?c=1"
    //         }
    //     }
    // ], []);


    return (
        <>
        <div className='relative'>
             <div>
                {[...Array(count)].map((_, index) => (
                    <div key={index} className='flex flex-row justify-center items-center max-w-[700px] gap-4'>
                        <div>
                            <RxDragHandleDots2 />
                        </div>
                        <div>
                            {index + 1}.
                        </div>
                        <div className="relative w-full flex flex-row justify-center items-center  pt-2 pb-2">
                            <Button variant="ghost" className="absolute right-3 text-[#0003] h-[20px] w-[20px]" onClick={() => {
                                setShowPopup(true)
                                console.log("showpopup clicked")
                                }}>
                                <MdModeEdit />
                            </Button>
                            <input
                                type="input"
                                placeholder="Select Product"
                                className="w-full p-1.5 pl-10 border border-[#0003] rounded focus:outline-none focus:border-[#000]  placeholder:text-[#0003] shadow"
                            />
                        </div>
                        <div>
                            {!showDiscounts[index] ? (
                                <Button
                                    className="bg-[#008060] text-[#F5F5F5] font-semibold text-[14px] px-4 py-2 rounded-md cursor-pointer hover:bg-[#008060]"
                                    onClick={() =>
                                        setShowDiscounts(prev => ({ ...prev, [index]: true }))
                                    }
                                >
                                    Add Discount
                                </Button>
                            ) : (
                                <div className='flex flex-row items-center justify-start gap-2'>
                                    <Input
                                        type="text"
                                        placeholder='Discount'
                                        className='p-2 w-[100px]'
                                    />
                                    <Select>
                                        <SelectTrigger className="w-[100px]">
                                            <SelectValue placeholder="" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="% off">% off</SelectItem>
                                            <SelectItem value="Flat off">Flat off</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>
                        <div>
                            {count > 1 && (
                                <Button variant="ghost" onClick={() => decreaseCount(index)}>
                                    <IoIosClose className='text-[#0003]' />
                                </Button>
                            )}
                        </div>

                    </div>

                ))}


                <div className='flex flex-row justify-end'>
                    <Button
                        className="text-[#008060] bg-transparent border border-[#008060] font-semibold text-[14px] px-4 py-2 rounded-md mt-4 hover:bg-[#008060] hover:text-[#fff] cursor-pointer"
                        onClick={increaseCount}
                    >
                        Add Product
                    </Button>
                </div>
            </div>
            <SearchPopup id="searchpopup"  style={{display : showPopup ? "block" : "none"}} className="h-full w-full bg-[#0001] absolute top-0 left-0 z-50"/>
           
        </div>
        </>
    )
}

export default AddProductsDesktop;
