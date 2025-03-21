'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/hooks/useRegisterModal';
import useLoginModal from '@/hooks/useLoginModal';
import { User } from '@prisma/client';

import { signOut } from 'next-auth/react';

import i18n from "../language/i18n"
import { useTranslation } from 'react-i18next';
import useRentModal from '@/hooks/useRentModal';

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenu = ({currentUser}:UserMenuProps) => {
  const { t } = useTranslation();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if(!currentUser){
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  if(!i18n.language){
    return null
}
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={() => { onRent() }}
          className="
            hidden
            md:block
            text-sm
            font-semibold
            py-3
            px-4
            rounded-full
            hover:bg-neutral-100
            transition
            cursor-pointer
          "
        >
          {t('rentNow')}
        </div>
        <div
          onClick={toggleOpen}
          className="
            p-4
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => {}}
                  label={t('My trips')}
                />
                <MenuItem
                  onClick={() => {}}
                  label={t('My favorires')}
                />
                <MenuItem
                  onClick={() => {}}
                  label={t('My reservations')}
                />
                <MenuItem
                  onClick={() => { rentModal.onOpen()  }}
                  label={t('RentYourOwnHouse')}
                />
                <hr />
                <MenuItem
                  onClick={() => {signOut()}}
                  label={t('Logout')}
                />
              </>
            ) : (

              <>
                <MenuItem
                  onClick={loginModal.onOpen}
                  label={t('login')}
                />
                <MenuItem
                  onClick={registerModal.onOpen}
                  label={t('SignUp')}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;