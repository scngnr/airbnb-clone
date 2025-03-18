"use client";

import { useTranslation } from "react-i18next";
import i18n from "./language/i18n";
import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./ui/Button";

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}

const EmptyState = ({
    title,
    subtitle,
    showReset,
}:EmptyStateProps) => {
    const { t } = useTranslation();

    const router = useRouter();



    if (!i18n.language) {
        return null;
    }

    return (
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
           <Heading
                center
                title={title || t("EmptyStateTitle")}
                subtitle={subtitle || t("EmptyStateSubtitle")}
            />
            <div className="w-48 mt-4">
                {showReset && (
                    <Button
                        outline
                        label={t("Reset")}
                        onClick={() => router.push("/")}
                    />
                )}
            </div>

        </div>
    );
}

export default EmptyState;