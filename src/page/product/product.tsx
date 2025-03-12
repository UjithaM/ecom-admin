
import { ProductDataTable } from "@/page/product/product-data-table.tsx";
import { productColumns } from "@/page/product/productColumns.tsx";
import {useFetchProduct} from "@/hooks/product/useFetchProduct.ts";
import {ProductFormModel} from "@/page/product/product-form-model.tsx";
import {useState} from "react";

function Product() {
    const [page, setPage] = useState(1);

    const { data: products, isLoading, isError } = useFetchProduct(page, 15);

    console.log(isLoading);

    return (
        <div className="container mx-auto py-10 px-10">
            <div className="card shadow-lg p-4 border-2 border-gray-200 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold mb-2">Product</h1>
                    <ProductFormModel />
                </div>
                {isError && <div>Error</div>}
                <ProductDataTable columns={productColumns} data={products?.data?.data ?? []} loading={isLoading} page={page} setPage={setPage} hasNextPage={products?.data?.hasNextPage ?? false} />
                {/*<ProductDataTable columns={productColumns} data={data} />*/}
            </div>
        </div>
    );
}

export default Product;