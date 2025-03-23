"use client";

import Calendar from "../Inputs/Calendar";

interface ListingReservationProps {
    price: number;
    dateRange: Range;
    totalPrice: number;
    onChangeDate: (dateRange: Range) => void;
    onSubmit: () => void;
    disabled: boolean;
    disabledDates: Date[];
}

const ListingReservation = ({
    price,
    dateRange,
    totalPrice,
    onChangeDate,
    onSubmit,
    disabled,
    disabledDates,
}: ListingReservationProps) => {
    return (
        <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden ">
            <div className="flex flex-row items-center gap-1 p-4">
                <div className="text-2xl font-semibold">
                    {price}
                </div>
                <div className="font-lisgt text-neutral-600">
                    night
                </div>
            </div>
            <hr/>
            <Calendar
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => onChangeDate(value.selection)}
            />
            <hr/>
            <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
                <div className="">
                    Total
                </div>
                <div className="">
                    {totalPrice}
                </div>
            </div>
        </div>
    );
}

export default ListingReservation;