import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { CldUploadWidget } from "next-cloudinary";

declare global {
    var cloudinary: any;
}

interface ImageUploadProps {
    value: string;
    onChange: (value: string) => void;
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {

    const handleUpload = useCallback((result: any) => {
        if (result?.info?.secure_url) {
            onChange(result.info.secure_url);
        }
    }, [onChange])

    return (
        <CldUploadWidget
            onSuccess={handleUpload}
            uploadPreset="airbnb-clone"
            options={{
                maxFiles: 1
            }}
        >
            {({ open }) => {
                return (
                    <div
                        onClick={() => open?.()}
                        className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
                    >
                        <TbPhotoPlus size={50} />
                        <div className="font-semibold text-lg">
                            Click to upload
                        </div>
                        {value && (
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                    alt="Upload"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority
                                    style={{ objectFit: "cover" }}
                                    src={value}
                                />
                            </div>
                        )}
                    </div>
                )
            }}
        </CldUploadWidget>
    );
}

export default ImageUpload;