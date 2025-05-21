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
    // const [showDiscounts, setShowDiscounts] = useState({});
    // const [searchTerm, setSearchTerm] = useState("");
    // const [debouncedSearch, setDebouncedSearch] = useState("");
    // const [selectedProductMap, setSelectedProductMap] = useState({});
    // const [selectedProducts, setSelectedProducts] = useState(0);

    const increaseCount = () => {

    }
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
            <div>
                <div className='flex flex-row justify-center items-center max-w-[700px] gap-4'>
                    <div>
                        <RxDragHandleDots2 />
                    </div>
                    <div>
                        {count}.
                    </div>
                    <div className="relative w-full flex flex-row justify-center items-center  pt-2 pb-2">
                        <Button variant="ghost" className="absolute right-3 text-[#0003] h-[20px] w-[20px]" onClick={() => { console.log("Popup should come here") }}>
                            <MdModeEdit />
                        </Button>
                        <input
                            type="input"
                            placeholder="Select Product"
                            className="w-full p-1.5 pl-10 border border-[#0003] rounded focus:outline-none focus:border-[#000]  placeholder:text-[#0003] shadow"
                        />
                    </div>
                    <div>
                        <Button
                            className="bg-[#008060] text-[#F5F5F5] font-semibold text-[14px] px-4 py-2 rounded-md"
                            onClick={() =>
                                console.log("Add Discount button is ")
                            }
                        >
                            Add Discount
                        </Button>
                    </div>

                </div>
                <div>
                    <Button
                        className="bg-[#008060] text-[#F5F5F5] font-semibold text-[14px] px-4 py-2 rounded-md mt-4"
                        onClick={increaseCount}
                    >
                        Add Product
                    </Button>
                </div>
            </div>
        </>
    )
}

export default AddProductsDesktop;
