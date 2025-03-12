import {AxiosResponse} from "axios";
import {client} from "@/api/private-client.ts";
import {useQuery} from "@tanstack/react-query";
import {Category} from "@/types/category.ts";

const fetchCategory = async (page: number, limit: number): Promise<AxiosResponse<Category[]>> => {
    return await client.get<Category[]>(`category?page=${page}&limit=${limit}`);
}

export const useFetchCategory = (page: number, limit: number) => {
    return useQuery(
        {
            queryKey: ['category', page, limit],
            queryFn: () => fetchCategory(page, limit),
            staleTime: 1000 * 60 * 5,
        }
    );
}