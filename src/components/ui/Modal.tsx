import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactElement, ReactNode } from "react";

interface ModalProps  {
    isOpen: boolean;
    children: ReactNode;
    className?: string;
    cancelIcon?: ReactElement;
    onClose: () => void;
}

export function Modal({ isOpen, onClose, children, className }: ModalProps) {
    return (
        <AnimatePresence>
            {
                isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.75 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed z-[50] inset-0 bg-black data-[state=open]:animate-overlay-show"
                            onClick={onClose}
                        />
                        <div className="fixed z-[60] pl-[16px] pr-[32px] left-0 top-0 h-screen w-screen overflow-y-auto grid place-items-center" onClick={onClose}>
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.95, opacity: 0, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className={cn("bg-transparent h-max w-full focus:outline-none relative", className)}
                                onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
                            >
                                {children}
                            </motion.div>
                        </div>
                    </>
                )
            }
        </AnimatePresence >
    )
}