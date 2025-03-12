import { client } from "@/api/private-client.ts";
import { useMutation } from "@tanstack/react-query";

const saveProductImages = async ({
                                     productId,
                                     images
                                 }: {
    productId: number;
    images: File[];
}) => {
    const formData = new FormData();

    // Append each image to the FormData
    images.forEach(image => {
        formData.append('images', image);
    });

    return await client.post(`product/${productId}/upload-images`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const useSaveProductImages = () => {

    return useMutation({
        mutationFn: saveProductImages,
    });
};