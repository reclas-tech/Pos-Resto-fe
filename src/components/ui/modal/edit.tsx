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

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title?: string;
  editButtonText?: string;
  cancelButtonText?: string;
  children: React.ReactNode;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title = "Edit Data",
  editButtonText = "Ubah",
  cancelButtonText = "Batal",
  children,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[470px]">
        <form onSubmit={onSubmit} className="space-y-5">
          <DialogHeader className="flex justify-center p-4   rounded-lg border-b">
            <Button
              type="button"
              className=""
              variant="closeModal"
              onClick={onClose}
            >
              <CloseModalSVG />
            </Button>
            <DialogTitle className="font-semibold  text-black dark:text-white">
              {title}
            </DialogTitle>
          </DialogHeader>
          <div className="ml-4 mr-4 mt-1">{children}</div>
          <DialogDescription className="hidden"></DialogDescription>
          <DialogFooter className="w-full p-4 pt-3 flex gap-2">
            <Button
              type="button"
              className="w-full dark:text-white"
              variant="outline"
              onClick={onClose}
            >
              {cancelButtonText}
            </Button>
            <Button type="submit" className="w-full" variant="default">
              {editButtonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
