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

interface ValidationChoiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    choiceModal: (data: any) => void;
    detailModal: (data: any) => void;
    title?: string;
    choiceButtonText?: string;
    detailButtonText?: string;
    choiceButton?: boolean;
    detailButton?: boolean;
    closeButton?: boolean;
    classNameDialogHeader?: string;
    classNameDialogFooter?: string;
    classNameDialogTitle?: string;
    classNameButton?: string;
    children: React.ReactNode;
}

const ValidationChoiceModal: React.FC<ValidationChoiceModalProps> = ({
    isOpen,
    onClose,
    choiceModal,
    detailModal,
    title = "Detail",
    choiceButtonText = "Pindah Meja",
    detailButtonText = "Detail Pesanan",
    choiceButton = false,
    detailButton = false,
    closeButton = false,
    classNameDialogHeader = "relative p-4 rounded-lg border-b",
    classNameDialogFooter = "w-full p-4 pt-3 flex gap-2",
    classNameDialogTitle = "text-black dark:text-white font-semibold",
    children,
}) => {
    const handleChoiceModal = () => {
        choiceModal({});
        onClose();
    };

    const handleDetailModal = () => {
        detailModal({});
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[392px] p-4">
                <DialogHeader className={classNameDialogHeader}>
                    {closeButton && (
                        <Button type="button" variant="closeModal" onClick={onClose}>
                            <CloseModalSVG />
                        </Button>
                    )}
                    <DialogTitle className={classNameDialogTitle}>{title}</DialogTitle>
                </DialogHeader>
                <div>{children}</div>
                <DialogDescription className="hidden"></DialogDescription>
                <DialogFooter className={classNameDialogFooter}>
                    {choiceButton && (
                        <Button
                            type="button"
                            className="w-full border-secondaryColorx"
                            variant="outline"
                            onClick={handleChoiceModal}
                        >
                            {choiceButtonText}
                        </Button>
                    )}
                    {detailButton && (
                        <Button
                            type="button"
                            className="w-full"
                            variant="default"
                            onClick={handleDetailModal}
                        >
                            {detailButtonText}
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ValidationChoiceModal;
