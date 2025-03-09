"use client";

import useRentModal from "@/hooks/useRentModal";
import Modal from "./Modal"
import { t } from "i18next";

const RentModal = () => {

    const rentModal = useRentModal();

    return ( 
        <Modal
            isOpen={rentModal.isOpen}
            onClose={rentModal.onClose}
            onSubmit={rentModal.onClose}
            actionLabel="Submit"
            title={t('RentYourOwnHouse')}
        >

        </Modal>

     );
}
 
export default RentModal;