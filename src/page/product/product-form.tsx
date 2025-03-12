import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {useSaveProduct} from "@/hooks/product/useSaveProduct.ts";
import {Loader2} from "lucide-react";
import { toast } from "sonner"
import {useFetchCategory} from "@/hooks/category/useFetchCategory.ts";
import {useSaveProductImages} from "@/hooks/product/useSaveProductImages.ts";
import {useEffect, useState} from "react";


// Define the schema based on your DTO
const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    price: z.coerce.number().positive({
        message: "Price must be a positive number.",
    }),
    stock: z.coerce
        .number()
        .int({
            message: "Stock must be an integer.",
        })
        .nonnegative({
            message: "Stock cannot be negative.",
        }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    categoryId: z.coerce
        .number()
        .int({
            message: "Category ID must be an integer.",
        })
        .positive({
            message: "Category ID must be positive.",
        }),
    images: z.array(
        z.instanceof(File).or(z.string())
    ).nonempty({
        message: "At least one product image is required.",
    }),
})

type ProductFormValues = z.infer<typeof formSchema>

// Default values for the form
const defaultValues: Partial<ProductFormValues> = {
    name: "",
    price: 0,
    stock: 0,
    description: "",
    categoryId: 0,
}

export function ProductForm( { onSaveSuccess }: { onSaveSuccess: () => void }) {
    // Initialize the form
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })
    const [selectedImages, setSelectedImages] = useState<File[]>([]);

    const { mutate, isLoading, isError, isSuccess, error, data: savedProduct } = useSaveProduct();

    const { data: categoryData } = useFetchCategory(1, 100);

    const {
        mutate: saveImagesMutate,
        isLoading: saveImagesLoading
    } = useSaveProductImages();

    function onSubmit(values: ProductFormValues) {
        console.log(values);
        mutate({
            name: values.name,
            price: values.price,
            description: values.description,
            soldOut: false,
            stock: values.stock,
            categoryId: values.categoryId
        });
    }

    if (isError && error) {
        console.log(error);
        toast.error("Failed to save product", {
            position: "top-right",
            description: "Something went wrong.",
        });
    }

    // Handle image upload after product is saved
    useEffect(() => {
        if (isSuccess && savedProduct?.data?.id && selectedImages.length > 0) {
            saveImagesMutate({
                productId: savedProduct.data.id,
                images: selectedImages
            });

            toast.success("Product saved successfully.", {
                position: "top-right",
            });
            onSaveSuccess();
        } else if (isSuccess) {
            toast.success("Product saved successfully.", {
                position: "top-right",
            });
            onSaveSuccess();
        }
    }, [isSuccess, savedProduct, selectedImages]);

    if (isError) {
        console.log(error);
        toast.error(error.response.data.message, {
            position: "top-right",
            description: "Something went wrong.",

        })
    }

    if (isSuccess) {
        console.log("Product saved successfully.");
        toast.success("Product saved successfully.", {
            position: "top-right",
        })
        onSaveSuccess();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter product name" {...field} />
                            </FormControl>
                            <FormDescription>The name of your product as it will appear to customers.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                                </FormControl>
                                <FormDescription>Product price in your currency.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Stock</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="0" {...field} />
                                </FormControl>
                                <FormDescription>Available quantity in inventory.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter product description" className="min-h-[120px]" {...field} />
                            </FormControl>
                            <FormDescription>Detailed description of your product.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <select {...field}>
                                    {categoryData?.data?.data?.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </FormControl>
                            <FormDescription>Select the category this product belongs to.</FormDescription>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Product Images</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => {
                                        const files = Array.from(e.target.files || []);
                                        setSelectedImages(files);
                                        // Set form value for validation
                                        field.onChange(files.length > 0 ? files : undefined);
                                    }}
                                />
                            </FormControl>
                            <FormDescription>Upload one or more product images. Supported formats: JPEG, PNG.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full md:w-auto" disabled={isLoading || saveImagesLoading}>
                    {(isLoading || saveImagesLoading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Product
                </Button>
            </form>
        </Form>
    )
}

