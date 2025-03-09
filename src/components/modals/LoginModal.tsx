"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";

import Heading from "../Heading";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import Input from "../Inputs/Input";

import i18n from "../language/i18n"
import { useTranslation } from 'react-i18next';

import { useRouter } from "next/navigation";

const LoginModal = () => {
    const { t } = useTranslation();
    
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        }).then((res) => {
            if(res?.ok){
                console.log(res);
                toast.success(t('loginSuccess', { name: "John Doe"} ));
                router.refresh();
                loginModal.onClose();
            }

            if (res?.error) {
                toast.error(res.error);
            }
            setIsLoading(false);
        })
    }

    const toggle = useCallback(() => {
        registerModal.onOpen();
        loginModal.onClose();
    }, [registerModal, loginModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title={t('welcome')}
                subtitle={t('logintoyouraccount')}
            />
            <Input
                id="email"
                label={t('email')}
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
                onClick={() => { signIn("google") }}
            />
            <Button
                outline
                label={t('continueWithGithub')}
                icon={AiFillGithub}
                onClick={() => { signIn("github") }}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                <div className="justify-center flex flex-row items-center gap-2">
                <div>{t('firstTimeUsingApp')}</div>
                <div onClick={toggle} className="text-neutral-800 cursor-pointer hover:underline">
                        {t('createAnAccount')}
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
            isOpen={loginModal.isOpen}
            title={t('login')}
            actionLabel={t('continue')}
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    );
}

export default LoginModal;