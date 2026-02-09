import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ConfirmationPopUp = ({
  onAcc,
  text,
  setModal,
}: {
  onAcc: () => void;
  text: string;
  setModal: (value: boolean) => void;
}) => {
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{text}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className="cursor-pointer !bg-[#0A3917] !hover:bg-green-900"
            onClick={() => {
              onAcc();
              setModal(false);
            }}
          >
            Yes
          </AlertDialogAction>
          <AlertDialogAction
            className="cursor-pointer !bg-red-500 !hover:bg-green-900"
            onClick={() => setModal(false)}
          >
            No
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationPopUp;
