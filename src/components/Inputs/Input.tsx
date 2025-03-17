"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { FaTurkishLiraSign } from "react-icons/fa6";
import { BsCurrencyEuro, BsCurrencyPound, BsCurrencyYen } from "react-icons/bs";
import i18n from "../language/i18n";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    formatPrice?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
}

const Input = ({
    id,
    label,
    type = "text",
    disabled,
    formatPrice,
    required,
    register,
    errors
}: InputProps) => {
    const getCurrencyIcon = () => {
        const language = i18n.language;
        switch(language) {
            case 'tr':
                return <FaTurkishLiraSign size={24} className="text-neutral-700 absolute top-5 left-2" />;
            case 'de':
            case 'fr':
            case 'es':
            case 'it':
                return <BsCurrencyEuro size={24} className="text-neutral-700 absolute top-5 left-2" />;
            case 'ja':
                return <BsCurrencyYen size={24} className="text-neutral-700 absolute top-5 left-2" />;
            case 'gb':
                return <BsCurrencyPound size={24} className="text-neutral-700 absolute top-5 left-2" />;
            default:
                return <BiDollar size={24} className="text-neutral-700 absolute top-5 left-2" />;
        }
    };

    return (
        <div className="w-full relative">
            {formatPrice && getCurrencyIcon()}
            <input
                id={id}
                disabled={disabled}
                {...register(id, { required })}
                placeholder=""
                type={type}
                className={`
                    peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none disabled:opacity-70 disabled:cursor-not-allowed
                    ${formatPrice ? "pl-9" : "pl-4"}
                    ${errors[id] ? "border-rose-500" : "border-neutral-300"}
                    ${errors[id] ? "focus:border-rose-500" : "focus:border-gray-500/50"}
                `}
            />
            <label className={`
                    absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0]
                    ${formatPrice ? 'left-9' : 'left-4'}
                    peer-placeholder-shown:translate-y-0
                    peer-focus:-translate-y-8
                    bg-white
                    ${errors[id]? "text-rose-500" : "text-neutral-500"}
                `}>
                {label}
            </label>
        </div>
    );
}

export default Input;