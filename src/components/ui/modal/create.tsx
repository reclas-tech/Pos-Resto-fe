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
import { CloseModalSVG } from "@/constants/svgIcons";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
  title?: string;
  addButtonText?: string;
  cancelButtonText?: string;
  children: React.ReactNode;
}

const CreateModal: React.FC<CreateModalProps> = ({
  isOpen,
  onClose,
  onCreate,
  title = "Tambah Data",
  addButtonText = "Tambah",
  cancelButtonText = "Batal",
  children,
}) => {
  const handleAdd = () => {
    const data = {};
    onCreate(data);
    onClose();
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
        <div className="ml-4 mr-4 mt-1">{children}</div>
        <DialogDescription className="hidden"></DialogDescription>
        <DialogFooter className="w-full p-4 pt-3 flex gap-2">
          <Button
            className="w-full dark:text-white"
            variant="outline"
            onClick={onClose}
          >
            {cancelButtonText}
          </Button>
          <Button className="w-full" variant="default" onClick={handleAdd}>
            {addButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateModal;
