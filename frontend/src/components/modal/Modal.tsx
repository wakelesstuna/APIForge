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
  onClose: () => void;
  onCloseButtonText?: string;
  className?: string;
  children: React.ReactNode;
};

const DialogModal = ({
  title,
  isOpened,
  onProceed,
  onProceedButtonText = "Procced",
  onClose,
  onCloseButtonText = "Close",
  className,
  children,
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

      <div className="flex gap-5 py-4 justify-end pr-6">
        <button
          className="px-4 py-2 rounded-md border border-transparent hover:border-gray-300"
          onClick={onClose}
        >
          {onCloseButtonText}
        </button>
        <button
          className="bg-green-700 px-4 py-2 rounded-md border border-transparent hover:border-gray-300"
          onClick={proceedAndClose}
        >
          {onProceedButtonText}
        </button>
      </div>
    </dialog>
  );
};

export default DialogModal;
