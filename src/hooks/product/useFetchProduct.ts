import {client} from "@/api/private-client.ts";
import {Product} from "@/types/product.types.ts";
import {AxiosResponse} from "axios";
import {useQuery} from "@tanstack/react-query";


const fetchProducts = async (page: number, limit: number): Promise<AxiosResponse<Product[]>> => {
    return await client.get<Product[]>(`product?page=${page}&limit=${limit}`);
}

export const useFetchProduct = (page: number, limit: number) => {
    return useQuery(
        {
            queryKey: ['products', page, limit],
            queryFn: () => fetchProducts(page, limit),
            staleTime: 1000 * 60 * 5,
        }
    );
}