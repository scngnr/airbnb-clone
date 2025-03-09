"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState, useCallback } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "@/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Inputs/Input";
import toast from "react-hot-toast";
import Button from "../ui/Button";
import { useTranslation } from 'react-i18next';
import i18n from "../language/i18n"
import { signIn } from "next-auth/react";
import useLoginModal from "@/hooks/useLoginModal";

const RegisterModal = () => {
    const { t } = useTranslation();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post("/api/register", data)
            .then((res) => {
                setIsLoading(false);
                registerModal.onClose();
            })
            .catch((err) => {
                setIsLoading(false);
                toast.error("Something Went Wrong!");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const toggle = useCallback(() => {
        loginModal.onOpen();
        registerModal.onClose();
    }, [registerModal, loginModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title={t('welcome')}
                subtitle={t('createAccount')}
            />
            <Input
                id="email"
                label={t('email')}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label={t('name')}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label={t('password')}
                register={register}
                errors={errors}
                required
                type="password"
            />
        </div>
    );

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <Button
                outline
                label={t('continueWithGoogle')}
                icon={FcGoogle}
                onClick={() => { signIn('google') }}
            />
            <Button
                outline
                label={t('continueWithGithub')}
                icon={AiFillGithub}
                onClick={() => { signIn('github') }}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>{t('alreadyHaveAccount')}</div>
                    <div onClick={toggle} className="text-neutral-800 cursor-pointer hover:underline">
                        {t('login')}
                    </div>
                </div>
            </div>
        </div>
    );

    if(!i18n.language){
        return null
    }

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title={t('register')}
            actionLabel={t('continue')}
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default RegisterModal;