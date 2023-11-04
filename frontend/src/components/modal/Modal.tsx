import { cn } from "../../utils/tailwind.utils";
import { MouseEvent, useEffect, useRef } from "react";

const isClickInsideRectangle = (e: MouseEvent, element: HTMLElement) => {
  const r = element.getBoundingClientRect();

  return (
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom
  );
};

type Props = {
  title: string;
  isOpened: boolean;
  onProceed: () => void;
  onProceedButtonText?: string;
  onProceedButtonType?: "warning" | "info";
  onClose: () => void;
  onCloseButtonText?: string;
  className?: string;
  children: React.ReactNode;
  buttons?: boolean;
};

const DialogModal = ({
  title,
  isOpened,
  onProceed,
  onProceedButtonText = "Procced",
  onProceedButtonType = "info",
  onClose,
  onCloseButtonText = "Close",
  className,
  children,
  buttons = true,
}: Props) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpened) {
      ref.current?.showModal();
      document.body.classList.add("modal-open"); // prevent bg scroll
    } else {
      ref.current?.close();
      document.body.classList.remove("modal-open");
    }
  }, [isOpened]);

  const proceedAndClose = () => {
    onProceed();
    onClose();
  };

  const getProccedButtonTypeColor = () => {
    if (onProceedButtonType === "info") {
      return "bg-green-700";
    }
    if (onProceedButtonType === "warning") {
      return "bg-red-700";
    }
  };

  return (
    <dialog
      className={cn(
        "w-[400px] rounded-lg backdrop:bg-black/30 bg-gray-800 text-white",
        className
      )}
      ref={ref}
      onCancel={onClose}
      onClick={(e) =>
        ref.current && !isClickInsideRectangle(e, ref.current) && onClose()
      }
    >
      <h3 className="font-semibold pl-6 border-b border-gray-400 text-lg py-2">
        {title}
      </h3>

      {children}

      {buttons && (
        <div className="flex gap-5 py-4 justify-end pr-6">
          <button
            className="px-4 py-2 rounded-md border border-transparent hover:border-gray-300"
            onClick={onClose}
          >
            {onCloseButtonText}
          </button>
          <button
            className={cn(
              "px-4 py-2 rounded-md border border-transparent hover:border-gray-300",
              getProccedButtonTypeColor()
            )}
            onClick={proceedAndClose}
          >
            {onProceedButtonText}
          </button>
        </div>
      )}
    </dialog>
  );
};

export default DialogModal;
