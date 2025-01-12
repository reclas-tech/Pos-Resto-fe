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
import LoadingForm from "../../LoadingForm";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title?: string;
  addButtonText?: string;
  cancelButtonText?: string;
  children: React.ReactNode;
  loading?: boolean;
}

const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title = "Form Modal",
  addButtonText = "Simpan",
  cancelButtonText = "Batal",
  children,
  loading = false,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[470px]">
        <form onSubmit={onSubmit} className="space-y-5">
          <DialogHeader className="relative p-4  rounded-lg border-b">
            <Button type="button" variant="closeModal" onClick={onClose}>
              <CloseModalSVG />
            </Button>
            <DialogTitle className="font-semibold  text-black  dark:text-white">
              {title}
            </DialogTitle>
          </DialogHeader>
          <div className="ml-4 mr-4 mt-1">{children}</div>
          <DialogDescription className="hidden"></DialogDescription>
          <DialogFooter className="w-full p-4 pt-3 flex gap-2">
            <Button
              type="button"
              className="w-full dark:text-white border-primaryColor text-primaryColor hover:text-primaryColor"
              variant="outline"
              onClick={onClose}
            >
              {cancelButtonText}
            </Button>
            <Button
              type="submit"
              className="w-full bg-primaryColor text-white hover:bg-primaryColor"
              variant="default"
            >
              {loading ? <LoadingForm /> : addButtonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormModal;
