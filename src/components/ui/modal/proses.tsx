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

interface ProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeButton?: boolean;
  children: React.ReactNode;
}

const ProcessModal: React.FC<ProcessModalProps> = ({
  isOpen,
  onClose,
  closeButton = false,
  children,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[386px]">
        <DialogHeader>
          {closeButton && (
            <Button className="" variant="closeModal" onClick={onClose}>
              <CloseModalSVG />
            </Button>
          )}
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="ml-6 mr-6">{children}</div>
        <DialogDescription className="hidden"></DialogDescription>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessModal;
