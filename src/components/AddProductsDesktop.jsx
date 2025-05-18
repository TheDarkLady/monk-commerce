import React, { useState, useEffect, useMemo } from 'react'
import { RxDragHandleDots2 } from "react-icons/rx";
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
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const productData = useMemo(() => [
        {
            id: 77,
            title: "Fog Linen Chambray Towel - Beige Stripe",
            variants: [
                { id: 1, product_id: 77, title: "XS / Silver", price: "49" },
                { id: 2, product_id: 77, title: "S / Silver", price: "49" },
                { id: 3, product_id: 77, title: "M / Silver", price: "49" }
            ],
            image: {
                id: 266,
                product_id: 77,
                src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/77/images/266/foglinenbeigestripetowel1b.1647248662.386.513.jpg?c=1"
            }
        },
        {
            id: 80,
            title: "Orbit Terrarium - Large",
            variants: [
                { id: 64, product_id: 80, title: "Default Title", price: "109" }
            ],
            image: {
                id: 272,
                product_id: 80,
                src: "https://cdn11.bigcommerce.com/s-p1xcugzp89/products/80/images/272/roundterrariumlarge.1647248662.386.513.jpg?c=1"
            }
        }
    ], []);

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

    // Debounce effect
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm.toLowerCase());
        }, 300); // 300ms debounce

        return () => clearTimeout(handler);
    }, [searchTerm]);

    const filteredProducts = useMemo(() => {
        if (!debouncedSearch) return productData;
        return productData.filter(product =>
            product.title.toLowerCase().includes(debouncedSearch)
        );
    }, [debouncedSearch, productData]);

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Product</TableHead>
                        <TableHead>Discount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[...Array(count)].map((_, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">
                                <div className='relative flex flex-row items-center justify-start gap-2 mt-2'>
                                    <RxDragHandleDots2 />
                                    <input
                                        type="text"
                                        placeholder='Product Name'
                                        className='p-2 relative'
                                    />
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost">
                                                <MdModeEdit className='text-[#0003]' />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className='flex flex-row items-center justify-between gap-2  border-b-1 b-[#0003] pb-2'>
                                                    <h1>Select Products</h1>
                                                    <AlertDialogCancel asChild>
                                                        <Button variant="ghost">
                                                            <IoIosClose className="text-[#000] text-[16px]" />
                                                        </Button>
                                                    </AlertDialogCancel>
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    <div className="relative w-full border-b-1 b-[#0003] pt-2 pb-4">
                                                        <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#0003] h-[20px] w-[20px]" />
                                                        <input
                                                            type="search"
                                                            placeholder="Search"
                                                            value={searchTerm}
                                                            onChange={e => setSearchTerm(e.target.value)}
                                                            className="w-full p-2 pl-10 border border-[#0003] rounded focus:outline-none focus:border-[#000]  placeholder:text-[#0003]"
                                                        />
                                                    </div>

                                                    {/* Filtered Product Results */}
                                                    <div className="mt-4 space-y-4 max-h-[300px] overflow-y-auto">
                                                        {filteredProducts.length === 0 ? (
                                                            <div className="text-gray-500 text-center py-8">
                                                                No items found
                                                            </div>
                                                        ) : (
                                                            filteredProducts.map(product => (
                                                                <div key={product.id} className="flex flex-col gap-4 items-center  justify-end border p-2 rounded">
                                                                    <div className='flex flex-row items-center justify-start gap-2 w-full'>
                                                                        <input type="checkbox" />
                                                                        <img
                                                                            src={product.image.src}
                                                                            alt={product.title}
                                                                            className="w-[60px] h-[60px] object-cover rounded"
                                                                        />
                                                                        <h2 className="font-medium text-sm">{product.title}</h2>
                                                                    </div>
                                                                    {product.variants.map(variant => (

                                                                        <div key={variant.id} className='flex flex-row items-start justify-between w-[80%]'>
                                                                            <div className='flex flex-row items-center justify-start gap-2 w-full'>
                                                                                <input type="checkbox" />
                                                                                <h4>{variant.title}</h4>
                                                                            </div>
                                                                            <div className='flex flex-row items-center justify-start gap-2 w-full'>
                                                                                <h4>${variant.price}</h4>
                                                                            </div>

                                                                            {/* <ul className="text-xs text-gray-600 mt-1 space-y-1">
                                                                                {product.variants.map(variant => (
                                                                                    <li key={variant.id}>
                                                                                        {variant.title} – ${variant.price}
                                                                                    </li>
                                                                                ))}
                                                                            </ul> */}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ))
                                                        )}
                                                    </div>
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel >Cancel</AlertDialogCancel>
                                                <AlertDialogAction className="bg-[#008060] hover:bg-[#008060ce]">Add</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </TableCell>
                            <TableCell>
                                {!showDiscounts[index] ? (
                                    <Button
                                        className="bg-[#008060] text-[#F5F5F5] font-semibold text-[14px] px-4 py-2 rounded-md"
                                        onClick={() =>
                                            setShowDiscounts(prev => ({ ...prev, [index]: true }))
                                        }
                                    >
                                        Add Discount
                                    </Button>
                                ) : (
                                    <div className='flex flex-row items-center justify-start gap-2 mt-4'>
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
                            </TableCell>
                            <TableCell>
                                {count > 1 && (
                                    <Button variant="ghost" onClick={() => decreaseCount(index)}>
                                        <IoIosClose className='text-[#0003]' />
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter className="bg-transparent">
                    <TableRow>
                        <TableHead></TableHead>
                        <TableHead>
                            <Button
                                className="bg-[#008060] text-[#F5F5F5] font-semibold text-[14px] px-4 py-2 rounded-md mt-4"
                                onClick={increaseCount}
                            >
                                Add Product
                            </Button>
                        </TableHead>
                    </TableRow>
                </TableFooter>
            </Table>
        </>
    )
}

export default AddProductsDesktop;
