import { Alert, AlertTitle } from "@mui/material";
import { useAsyncError } from "react-router";

interface ErrorAlertProps {
  message: string;
}

export default function ErrorAlert({ message }: ErrorAlertProps) {
  const error = useAsyncError() as Error;
  return (
    <Alert severity="error" variant="filled">
      <AlertTitle>{message}</AlertTitle>
      {error.message}
    </Alert>
  );
}
