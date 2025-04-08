import { format } from "date-fns";

export function formatDate(dateTime: string) {
  return format(new Date(dateTime), "yyyy-MM-dd HH:mm:ss");
}
