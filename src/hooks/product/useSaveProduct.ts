import {client} from "@/api/private-client.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";


const saveProduct = async (product: {
    name: string;
    price: number;
    soldOut: boolean;
    stock: number;
    category: string;
}) => {
    return await client.post('product', product);
}

export const useSaveProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: saveProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['products']
            });
        }
    });
};