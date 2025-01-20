/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { UseFormHandleSubmit } from "react-hook-form";

interface ChoseTableModalProps {
  isOpen: boolean;
 onClose: () => void;
   handleSubmit: UseFormHandleSubmit<any>;
   // The actual submit handler
   onSubmit: (data: any) => void;
  title?: string;
  addButtonText?: string;
  cancelButtonText?: string;
  children: React.ReactNode;
  loading?: boolean;
}

const ChoseTableModal: React.FC<ChoseTableModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title = "Form Modal",
  addButtonText = "Simpan",
  cancelButtonText = "Batal",
  children,
  loading = false,
  handleSubmit,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[640px]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <DialogHeader className="relative p-4  rounded-lg border-b">
            <Button type="button" variant="closeModal" onClick={onClose}>
              <CloseModalSVG />
            </Button>
            <DialogTitle className="font-semibold  text-black  dark:text-white">
              {title}
            </DialogTitle>
          </DialogHeader>
          <div className="mx-1">{children}</div>
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

export default ChoseTableModal;
