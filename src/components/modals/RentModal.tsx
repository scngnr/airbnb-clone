"use client";

import Modal from "./Modal"
import { t } from "i18next";
import { useMemo, useState } from "react";
import useRentModal from "@/hooks/useRentModal";
import { categories } from "../Navbar/Categories/Categories";
import Heading from "../Heading";
import CategoryInput from "../Inputs/CategoryInput";

enum STEPS {
    CATEGORY,
    LOCATION,
    INFO,
    IMAGES,
    DESCRIPTION,
    PRICE,
}

const RentModal = () => {

    const rentModal = useRentModal();

    const [currentStep, setCurrentStep] = useState<STEPS>(STEPS.CATEGORY);

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
                            onClick={() => {}}
                            selected={false}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>

                ))}
            </div>
        </div>
    );

    return (
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={rentModal.onClose}
            actionLabel={t(actionLabel)}
            secondaryActionLabel={t(secondaryActionLabel)}
            secondaryAction={currentStep === STEPS.CATEGORY ? undefined : onBack}
            title={t('RentYourOwnHouse')}
            body={bodyContent}
        >

        </Modal>

    );
}

export default RentModal;