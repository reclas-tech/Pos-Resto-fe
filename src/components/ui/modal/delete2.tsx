import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CloseModalSVG, DeleteModalSVG } from "@/constants/svgIcons";
import LoadingForm from "../LoadingForm";

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    title?: string;
    description?: string;
    deleteButtonText?: string;
    cancelButtonText?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
    isOpen,
    onClose,
    onDelete,
    title = "Konfirmasi Hapus",
    description = "Anda yakin ingin menghapus item ini ?",
    deleteButtonText = "Hapus",
    cancelButtonText = "Batal",
}) => {
    // const handleDelete = () => {
    //   if (onDelete) {
    //     onDelete();
    //   }
    //   onClose();
    // };

    // 
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true); // Set loading to true when starting the delete operation
        try {
            await onDelete(); // Wait for the delete action to complete
        } catch (error) {
            console.error("Delete operation failed:", error);
        } finally {
            setLoading(false); // Set loading to false once the operation is complete
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[470px]">
                <DialogHeader className="relative p-4 rounded-lg border-b">
                    <Button className="" variant="closeModal" onClick={onClose}>
                        <CloseModalSVG />
                    </Button>
                    <DialogTitle className="text-black dark:text-white">
                        {title}
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="justify-center m-auto mb-4">
                    <DeleteModalSVG />
                </DialogDescription>
                <DialogDescription className="justify-center m-auto">
                    {description}
                </DialogDescription>
                <DialogFooter className="w-full p-4 flex gap-2">
                    <Button
                        className="w-full dark:text-white"
                        variant="outline"
                        onClick={onClose}
                    >
                        {cancelButtonText}
                    </Button>
                    <Button
                        className="w-full"
                        variant="destructive"
                        onClick={handleDelete}
                    >
                        {loading ? <LoadingForm /> : deleteButtonText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteModal;
