import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

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
  description = "Apakah Anda yakin ingin menghapus item ini?",
  deleteButtonText = "Hapus",
  cancelButtonText = "Batal",
}) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="relative">
          {/* <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button> */}
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            {cancelButtonText}
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            {deleteButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
