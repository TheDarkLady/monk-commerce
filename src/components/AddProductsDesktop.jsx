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
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";

const AddProductsDesktop = () => {
    const [count, setCount] = useState(1);
    const [showDiscounts, setShowDiscounts] = useState({});
    const [showPopup, setShowPopup] = useState(false)
    const [selectedProductsArray, setSelectedProductsArray] = useState(Array(count).fill(null));
    const [editingIndex, setEditingIndex] = useState(null);
    const [showVarients, setShowVarients] = useState(false)
    const [dragVariantIndex, setDragVariantIndex] = useState(null);


    const increaseCount = () => {
        setCount(prev => prev + 1);
        setSelectedProductsArray(prev => [...prev, null]);
    };

    const decreaseCount = (index) => {
        if (count > 1) {
            setCount(prev => prev - 1);
            setSelectedProductsArray(prev => {
                const updated = [...prev];
                updated.splice(index, 1);
                return updated;
            });
            setShowDiscounts(prev => {
                const updated = { ...prev };
                delete updated[index];
                return updated;
            });
        }
    };

    const handleAddProducts = (products) => {
        console.log("Selected product from popup:", products[0]);
        setSelectedProductsArray(prev => {
            const updated = [...prev];
            updated[editingIndex] = products[0]; // Assuming one product per field
            return updated;
        });
        setShowPopup(false);
    };

    const handleVariantDragStart = (variantIndex) => {
        setDragVariantIndex(variantIndex);
    };

    const handleVariantDrop = (productIndex, dropIndex) => {
        if (dragVariantIndex === null) return;

        setSelectedProductsArray(prev => {
            const updated = [...prev];
            const product = updated[productIndex];
            if (!product || !product.variants) return prev;

            const reorderedVariants = [...product.variants];
            const [dragged] = reorderedVariants.splice(dragVariantIndex, 1);
            reorderedVariants.splice(dropIndex, 0, dragged);

            updated[productIndex] = {
                ...product,
                variants: reorderedVariants,
            };

            return updated;
        });

        setDragVariantIndex(null);
    };


    return (
        <>
            <div className='relative'>
                <div className='flex flex-col justify-center items-start gap-6'>
                    {[...Array(count)].map((_, index) => (
                        <div key={index} className='flex flex-col  justify-center items-start max-w-[700px] gap-2'>
                            <div className='flex flex-row justify-center items-center w-full'>
                                {/* icon */}
                                <div>
                                    <RxDragHandleDots2 />
                                </div>

                                {/* serial number */}
                                <div className='ml-2'>
                                    {index + 1}.
                                </div>

                                {/* input */}
                                <div className="relative w-full flex flex-row justify-center items-center pt-2 pb-2 ml-2">
                                    <Button variant="ghost" className="absolute right-3 text-[#0003] h-[20px] w-[20px]" onClick={() => {
                                        setEditingIndex(index);
                                        setShowPopup(true);
                                    }}>
                                        <MdModeEdit />
                                    </Button>
                                    <input
                                        type="text"
                                        readOnly
                                        value={selectedProductsArray[index]?.title || ''}
                                        placeholder="Select Product"
                                        className="w-full p-1.5  border border-[#0003] rounded focus:outline-none focus:border-[#000] placeholder:text-[#0003] shadow"
                                    />
                                </div>

                                {/* Discount */}
                                <div className="ml-2">
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

                                {/* Close */}
                                <div>
                                    {count > 1 && (
                                        <Button variant="ghost" onClick={() => decreaseCount(index)}>
                                            <IoIosClose className='text-[#0003]' />
                                        </Button>
                                    )}
                                </div>
                            </div>
                            {/* 👇 Show selected variants if available */}
                            {selectedProductsArray[index]?.variants?.length > 0 && (
                                <div className='flex flex-col justify-end items-end text-sm text-gray-600 w-full gap-2'>
                                    {/* <a onClick={() => setShowVarients(false)}>Hide Varients</a> */}
                                    {showVarients ? (
                                        <>
                                            <div className='flex justify-end w-full'>
                                                <a
                                                    className=" flex flex-row justify-center items-center gap-1 text-sm text-blue-600 underline cursor-pointer"
                                                    onClick={() => setShowVarients(false)}
                                                >
                                                    Hide Variants
                                                    <FaAngleUp />
                                                </a>
                                            </div>
                                            {selectedProductsArray[index].variants.map((variant, i) => (
                                                <div key={variant.id} className='flex flex-row justify-end items-center text-sm text-gray-600 w-[80%] gap-2 cursor-grab active:cursor-grabbing' draggable
                                                    onDragStart={() => handleVariantDragStart(i)}
                                                    onDragOver={(e) => e.preventDefault()}
                                                    onDrop={() => handleVariantDrop(index, i)}>
                                                    <div>
                                                        <RxDragHandleDots2 />
                                                    </div>
                                                    <div className='ml-2'>
                                                        {i + 1}.
                                                    </div>
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        value={variant.title}
                                                        className="w-full p-1.5  border border-[#0003] rounded focus:outline-none focus:border-[#000] placeholder:text-[#0003] shadow cursor-grab active:cursor-grabbing"
                                                    />
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
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <div className='flex justify-end w-full'>
                                            <a
                                                className="flex flex-row justify-center items-center gap-1 text-sm text-blue-600 underline cursor-pointer"
                                                onClick={() => setShowVarients(true)}
                                            >
                                                Show Variants
                                                <FaAngleDown />
                                            </a>
                                        </div>
                                    )}

                                </div>
                            )}
                        </div>
                    ))}

                    {/* Add Product Button */}
                    <div className='w-full flex flex-row justify-end'>
                        <Button
                            className="text-[#008060] bg-transparent border border-[#008060] font-semibold text-[14px] px-4 py-2 rounded-md mt-4 hover:bg-[#008060] hover:text-[#fff] cursor-pointer"
                            onClick={increaseCount}
                        >
                            Add Product
                        </Button>
                    </div>
                </div>
            </div>

            {/* Search Popup */}
            {showPopup && (
                <SearchPopup
                    id="searchpopup"
                    setShowPopup={setShowPopup}
                    onAddProducts={handleAddProducts}
                />
            )}
        </>
    )
}

export default AddProductsDesktop;
