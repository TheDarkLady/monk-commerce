import React, { useState } from 'react'
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

const AddProductsDesktop = () => {
    const [count, setCount] = useState(1);
    const [showDiscounts, setShowDiscounts] = useState({});

    const increaseCount = () => {
        setCount(prev => prev + 1);
    }

    const decreaseCount = (index) => {
        if (count > 1) {
            setCount(prev => prev - 1);
            setShowDiscounts(prev => {
                const updated = { ...prev };
                delete updated[index];
                return updated;
            });
        } else {
            setCount(1);
        }
    }

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
                                    <AlertDialog className="absolute right-2 z-[99]">
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost">
                                                <MdModeEdit className='text-[#0003]' />
                                            </Button>z
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete your account
                                                    and remove your data from our servers.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Button
                                    style={{ display: showDiscounts[index] ? "none" : "block" }}
                                    className="bg-[#008060] text-[#F5F5F5] font-semibold text-[14px] px-4 py-2 rounded-md"
                                    onClick={() => {
                                        setShowDiscounts(prev => ({ ...prev, [index]: true }));
                                    }}
                                >
                                    Add Discount
                                </Button>
                                <div
                                    className='flex flex-row items-center justify-start gap-2 mt-4'
                                    style={{ display: showDiscounts[index] ? "flex" : "none" }}
                                >
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
                            </TableCell>
                            <TableCell>
                                <Button
                                    variant="ghost"
                                    onClick={() => decreaseCount(index)}
                                    style={{ display: count > 1 ? 'block' : 'none' }}
                                >
                                    <IoIosClose className='text-[#0003]' />
                                </Button>
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
