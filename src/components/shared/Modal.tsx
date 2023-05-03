import type { ButtonInterface } from "./Button";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import React from "react";

import { Button } from "./Button";

interface CTAButtons extends ButtonInterface {
  text: string;
}

interface OwnProps {
  title: string;
  date?: string;
  children: React.ReactNode;
  callToActionButtons: CTAButtons[];
  isVisible: boolean;
  toggleVisibility: () => void;
}

const Modal = ({
  title,
  date,
  children,
  callToActionButtons,
  isVisible,
  toggleVisibility,
}: OwnProps) => {
  return (
    <Dialog.Root open={isVisible} onOpenChange={toggleVisibility}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={`fixed z-20 inset-0 bg-modalOverlay ${
            isVisible ? "animate-overlayShow" : ""
          }`}
        />
        <Dialog.Content
          className={` w-96 z-30  fixed top-1/2 left-1/2 max-h-8.5/10-screen -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-4 shadow-modalShadow focus:outline-none ${
            isVisible ? "animate-contentShow" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-medium leading-5 text-gray-900">
              {title}
            </h4>
            <Dialog.Close asChild>
              <button
                className="flex h-6 w-6 appearance-none items-center justify-center rounded-full hover:bg-gray-100"
                aria-label="Close"
              >
                <Image
                  src="/icons/close.svg"
                  alt="close icon"
                  className=""
                  height={20}
                  width={20}
                />
              </button>
            </Dialog.Close>
          </div>
          {date && <p className="text-base leading-5 text-gray-500">{date}</p>}
          <div>{children}</div>
          <div className="flex w-full gap-2">
            {callToActionButtons.map((button) => {
              return (
                <Button
                  key={button.text}
                  onClick={button.onClick}
                  disabled={button.disabled}
                  variant={button.variant}
                >
                  {button.text}
                </Button>
              );
            })}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
