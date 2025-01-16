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
import { cn } from "@/lib/utils";

interface ValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmitTrigger: (data: any) => void;
  title?: string;
  cancelButtonText?: string;
  keluarButtonText?: string;
  SubmitButtonText?: string;
  showCancelButton?: boolean;
  showKeluarButton?: boolean;
  showSubmitButton?: boolean;
  closeButton?: boolean;
  classNameDialogHeader?: string;
  classNameDialogFooter?: string;
  classNameDialogTitle?: string;
  classNameButton?: string;
  children: React.ReactNode;
}

const ValidationModal: React.FC<ValidationModalProps> = ({
  isOpen,
  onClose,
  onSubmitTrigger,
  title = "Detail",
  cancelButtonText = "Tutup",
  keluarButtonText = "Gagal",
  SubmitButtonText = "Selesai",
  showCancelButton = false,
  showKeluarButton = false,
  showSubmitButton = false,
  closeButton = false,
  classNameDialogHeader = "relative p-4 rounded-lg border-b",
  classNameDialogFooter = "w-full p-4 pt-3 flex gap-2",
  classNameDialogTitle = "text-black dark:text-white font-semibold",
  classNameButton = "w-full",
  children,
}) => {
  const handleSubmit = () => {
    const data = {};
    onSubmitTrigger(data);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[392px] p-4">
          <DialogHeader className={classNameDialogHeader}>
            {closeButton && (
              <Button className="" variant="closeModal" onClick={onClose}>
                <CloseModalSVG />
              </Button>
            )}
            <DialogTitle className={classNameDialogTitle}>{title}</DialogTitle>
          </DialogHeader>
          <div className="ml-6 mr-6">{children}</div>
          <DialogDescription className="hidden"></DialogDescription>
          <DialogFooter className={classNameDialogFooter}>
            {showCancelButton && (
              <Button
                className={cn(
                  "w-full dark:text-white border-[#114F44] text-black",
                  classNameButton
                )}
                variant="outline"
                onClick={onClose}
              >
                {cancelButtonText}
              </Button>
            )}
            {showKeluarButton && (
              <Button
                className={cn(
                  "w-full dark:text-white border-[#114F44] text-black",
                  classNameButton
                )}
                variant="outline"
                onClick={onClose}
              >
                {keluarButtonText}
              </Button>
            )}
            {showSubmitButton && (
              <Button
                className="w-full"
                variant="default"
                onClick={handleSubmit}
              >
                {SubmitButtonText}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ValidationModal;
