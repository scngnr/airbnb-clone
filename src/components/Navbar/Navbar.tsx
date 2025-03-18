"use client";

import { User } from "@prisma/client";

import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

import i18n from "../language/i18n";
import { useTranslation } from 'react-i18next';

import Container from "@/components/Container";
import Categories from "./Categories/Categories";


interface NavbarProps {
    currentUser?: User | null;
}   

const Navbar = ({ currentUser }: NavbarProps) => {
    const { t } = useTranslation();
    


    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value;
        i18n.changeLanguage(newLang);
    };

    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-b-[1px] ">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0 ">
                        <Logo />
                        <Search />
                        <div className="flex flex-row items-center gap-3">
                            <select
                                onChange={handleLanguageChange}
                                value={i18n.language}
                                className="p-2 font-light bg-white border-[1px] rounded-md outline-none transition cursor-pointer"
                            >
                                <option value="tr">Türkçe</option>
                                <option value="en">English</option>
                            </select>
                            <UserMenu currentUser={currentUser} />
                        </div>
                    </div>
                </Container>
            </div>
            <Categories />
        </div>
    );
}

export default Navbar;