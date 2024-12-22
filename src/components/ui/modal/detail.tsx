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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDetail: (data: any) => void;
  title?: string;
  printButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  showPrintButton?: boolean;
  children: React.ReactNode;
}

const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  onDetail,
  title = "Detail",
  printButtonText = "Print",
  cancelButtonText = "Tutup",
  showCancelButton = true,
  showPrintButton = true,
  children,
}) => {
  const handleDetail = () => {
    const data = {};
    onDetail(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[664px]">
        <DialogHeader className="relative p-4 rounded-lg border-b">
          <Button className="" variant="closeModal" onClick={onClose}>
            <CloseModalSVG />
          </Button>
          <DialogTitle className="text-black dark:text-white font-semibold">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="ml-4 mr-4 mt-1">{children}</div>
        <DialogDescription className="hidden"></DialogDescription>
        <DialogFooter className="w-full p-4 pt-3 flex gap-2">
          {showCancelButton && (
            <Button
              className="w-full dark:text-white border-[#114F44] text-[#114F44]"
              variant="outline"
              onClick={onClose}
            >
              {cancelButtonText}
            </Button>
          )}
          {showPrintButton && (
            <Button className="w-full" variant="default" onClick={handleDetail}>
              {printButtonText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailModal;
