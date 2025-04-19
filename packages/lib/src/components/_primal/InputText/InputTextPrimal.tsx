import { classNames } from "../../../utils/classNames";

interface InputTextPrimalProps {
  className?: string;
}
export function InputTextPrimal({
  className,
}: InputTextPrimalProps) {
  return (
    <input
      type="text"
      placeholder="Type something..."
      className={classNames(
        "border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black",
        className,
      )}
    />
  );
}