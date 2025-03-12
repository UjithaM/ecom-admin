import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {ProductForm} from "@/page/product/product-form.tsx";
import {useState} from "react";

export function ProductFormModel() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSaveSuccess = () => {
        setIsDialogOpen(false);
    };

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="default" onClick={() => setIsDialogOpen(true)}>
                    Add Product
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add Product</DialogTitle>
                </DialogHeader>
                <ProductForm onSaveSuccess={handleSaveSuccess} />
            </DialogContent>
        </Dialog>
    );
}