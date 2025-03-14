"use client";

import Modal from "./Modal"
import { t } from "i18next";
import { useMemo, useState } from "react";
import useRentModal from "@/hooks/useRentModal";
import { categories } from "../Navbar/Categories/Categories";
import Heading from "../Heading";
import CategoryInput from "../Inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../Inputs/CountrySelect";
import Map from "../Map";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {

    const rentModal = useRentModal();

    const [currentStep, setCurrentStep] = useState<STEPS>(STEPS.CATEGORY);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: '',
            guestCount: 0,
            roomCount: 0,
            bathroomCount: 0,
            imageSrc: '',
            price: 1,
            description: '',
        },
    });

    const category = watch('category');
    const location = watch('location');

    const setCustumValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
        });
    }

    const onBack = () => {
        setCurrentStep((value) => value - 1);
    }

    const onNext = () => {
        setCurrentStep((value) => value + 1);
    }

    const actionLabel = useMemo(() => {

        if (currentStep === STEPS.PRICE) {
            return t('Create');
        }

        return t('Next');
    }, [currentStep]);

    const secondaryActionLabel = useMemo(() => {
        if (currentStep === STEPS.CATEGORY) {
            return undefined;
        }

        return t('Back');
    }, [currentStep]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title={t('Which of these best describes your place?')}
                subtitle={t('Pick a category')}
            />
            <div className="grid gridf-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto ">
                {categories.map((item) => (
                    <div key={item.label}>
                        <CategoryInput
                            onClick={(category) => setCustumValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>

                ))}
            </div>
        </div>
    );

    if (currentStep === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title={t('Where is your place located?')}
                    subtitle={t('Add a location')}
                />
                <CountrySelect
                    value={location}
                    onChange={(value) => setCustumValue('location', value)}
                />
                <Map />
            </div>
        );
    }

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={onNext}
            actionLabel={t(actionLabel, { action: "Next" })}
            secondaryActionLabel={t(secondaryActionLabel, { secondaryAction: "Back" })}
            secondaryAction={currentStep === STEPS.CATEGORY ? undefined : onBack}
            title={t('RentYourOwnHouse')}
            body={bodyContent}
        >

        </Modal>

    );
}

export default RentModal;