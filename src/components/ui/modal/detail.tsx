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

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
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
            className="w-full "
            variant="default"
            onClick={onClose}
          >Tutup</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailModal;
