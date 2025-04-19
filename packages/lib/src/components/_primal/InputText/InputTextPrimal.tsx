import { classNames } from "../../../utils/classNames";
import { Tag } from "../Tag/Tag";

interface InputTextPrimalProps {
  className?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export function InputTextPrimal({
  className,
  onChange,
  defaultValue,
  ...props
}: InputTextPrimalProps) {
  return (
    <Tag
      as="input"
      type="text"
      placeholder="Type something..."
      className={classNames(
        "border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground",
        className,
      )}
      onChange={onChange}
      defaultValue={defaultValue}
      {...props}
    />
  );
}