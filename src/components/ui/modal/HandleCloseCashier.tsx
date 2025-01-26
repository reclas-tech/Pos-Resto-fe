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
import LoadingForm from "../LoadingForm";

interface ValidationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    title?: string;
    keluarButtonText?: string;
    submitButtonText?: string;
    showKeluarButton?: boolean;
    showSubmitButton?: boolean;
    closeButton?: boolean;
    classNameDialogHeader?: string;
    classNameDialogFooter?: string;
    classNameDialogTitle?: string;
    classNameButton?: string;
    children: React.ReactNode;
    loading?: boolean;
}

const HandleCloseCashier: React.FC<ValidationModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title = "Detail",
    keluarButtonText = "Gagal",
    submitButtonText = "Selesai",
    showKeluarButton = false,
    showSubmitButton = false,
    closeButton = false,
    classNameDialogHeader = "relative p-4 rounded-lg border-b",
    classNameDialogFooter = "w-full p-4 pt-3 flex gap-2",
    classNameDialogTitle = "text-black dark:text-white font-semibold",
    classNameButton = "w-full",
    children,
    loading = false,
}) => {
    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[392px] p-4">
                    <form onSubmit={onSubmit} >
                        <DialogHeader className={classNameDialogHeader}>
                            {closeButton && (
                                <Button className="" variant="closeModal" onClick={onClose}>
                                    <CloseModalSVG />
                                </Button>
                            )}
                            <DialogTitle className={classNameDialogTitle}>{title}</DialogTitle>
                        </DialogHeader>
                        <div>{children}</div>
                        <DialogDescription className="hidden"></DialogDescription>
                        <DialogFooter className={classNameDialogFooter}>
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
                                <Button type="submit" className="w-full" variant="default">
                                    {loading ? <LoadingForm /> : submitButtonText}
                                </Button>
                            )}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default HandleCloseCashier;
