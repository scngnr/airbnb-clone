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

const RegisterModal = () => {

    const registerModal = useRegisterModal();
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
                alert(err.response.data.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to my Rent House"
                subtitle="Create a new account"
            />
            <Input 
                id="email"
                label="Email"
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Name"
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                register={register}
                errors={errors}
                required
                type="password"
            />
            <Input
                id="confirmPassword"
                label="Confirm Password"
                register={register}
                errors={errors}
                required
                type="password"
            />
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Contiune"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        />
    );
}

export default RegisterModal;