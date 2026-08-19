import type {WatchStatus} from "../interfaces";
import { STATUS_OPTIONS } from "../utils/constants";

interface StatusBadgeProps {
  status: WatchStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const option = STATUS_OPTIONS.find((item) => item.value === status);

  if (!option) return null;

  return (
    <span
      className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium ${option.classes}`}
    >
      {option.label}
    </span>
  );
}