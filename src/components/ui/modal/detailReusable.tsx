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
import { cn } from "@/lib/utils";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDetail: (data: any) => void;
  onPrint: (e: React.MouseEvent<HTMLButtonElement>) => void;
  title?: string;
  printButtonText?: string;
  cetakButtonText?: string;
  cancelButtonText?: string;
  keluarButtonText?: string;
  BuyyButtonText?: string;
  showCancelButton?: boolean;
  showKeluarButton?: boolean;
  showPrintButton?: boolean;
  showCetakButton?: boolean;
  showBuyyButton?: boolean;
  closeButton?: boolean;
  classNameDialogHeader?: string;
  classNameDialogFooter?: string;
  classNameDialogTitle?: string;
  classNameButton?: string;
  children: React.ReactNode;
}

const DetailModal: React.FC<DetailModalProps> = ({
  isOpen,
  onClose,
  onDetail,
  onPrint,
  title = "Detail",
  printButtonText = "Print",
  cetakButtonText = "Cetak Struk",
  cancelButtonText = "Tutup",
  keluarButtonText = "Keluar",
  BuyyButtonText = "Bayar",
  showCancelButton = false,
  showKeluarButton = false,
  showPrintButton = false,
  showCetakButton = false,
  showBuyyButton = false,
  closeButton = false,
  classNameDialogHeader = "relative p-4 rounded-lg border-b",
  classNameDialogFooter = "w-full p-4 pt-3 flex gap-2",
  classNameDialogTitle = "text-black dark:text-white font-semibold",
  classNameButton = "w-full",
  children,
}) => {
  const handleDetail = () => {
    const data = {};
    onDetail(data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[704px]">
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
                "w-full dark:text-white border-[#114F44] text-[#114F44]",
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
                "w-full dark:text-white border-primaryColor text-primaryColor",
                classNameButton
              )}
              variant="outline"
              onClick={onClose}
            >
              {keluarButtonText}
            </Button>
          )}
          {showPrintButton && (
            <Button
              className={classNameButton}
              variant="default"
              onClick={onPrint}
            >
              {printButtonText}
            </Button>
          )}
          {showCetakButton && (
            <Button
              className={classNameButton}
              variant="default"
              onClick={handleDetail}
            >
              {cetakButtonText}
            </Button>
          )}
          {showBuyyButton && (
            <Button
              className="w-fit bg-primaryColor text-white rounded-3xl text-sm"
              variant="default"
              onClick={handleDetail}
            >
              {BuyyButtonText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DetailModal;
