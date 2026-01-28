import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React from "react";

const ErrorModal = ({ error }: { error: unknown }) => {
  const router = useRouter();

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof AxiosError) {
      if (error.response?.status === 401) return "Please Login First";
      return error.response?.data?.message || error.message;
    }
    if (error instanceof Error) return error.message;
    return "An error occurred";
  };

  const is401Error =
    error instanceof AxiosError && error.response?.status === 401;

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Error</AlertDialogTitle>
          <AlertDialogDescription>
            {getErrorMessage(error)}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            className="cursor-pointer !bg-[#0A3917] !hover:bg-green-900"
            onClick={() => {
              if (is401Error) {
                router.push("/auth");
              }
            }}
          >
            {is401Error ? "Login" : "Okay"}
          </AlertDialogAction>
          <AlertDialogCancel className="cursor-pointer !text-white !bg-gray-500 !hover:bg-gray-900">
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ErrorModal;
