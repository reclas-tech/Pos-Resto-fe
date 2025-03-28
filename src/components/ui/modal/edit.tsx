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
import LoadingForm from "../LoadingForm";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title?: string;
  editButtonText?: string;
  cancelButtonText?: string;
  classNameDialogContent?: string;
  children: React.ReactNode;
  loading?: boolean;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title = "Edit Data",
  editButtonText = "Simpan",
  cancelButtonText = "Batal",
  classNameDialogContent = "sm:max-w-[470px]",
  children,
  loading = false,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={classNameDialogContent}>
        <form onSubmit={onSubmit} className="space-y-5">
          <DialogHeader className="flex justify-center p-5 rounded-lg border-b">
            <Button
              type="button"
              className=""
              variant="closeModal"
              onClick={onClose}
            >
              <CloseModalSVG />
            </Button>
            <DialogTitle className="font-semibold text-black dark:text-white">
              {title}
            </DialogTitle>
          </DialogHeader>
          <div className="ml-6 mr-6">{children}</div>
          <DialogDescription className="hidden"></DialogDescription>
          <DialogFooter className="w-full p-4 pt-3 flex gap-2">
            <Button
              type="button"
              className="w-full dark:text-white border-secondaryColor text-secondaryColor"
              variant="outline"
              onClick={onClose}
            >
              {cancelButtonText}
            </Button>
            <Button type="submit" className="w-full" variant="default">
              {loading ? <LoadingForm /> : editButtonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
