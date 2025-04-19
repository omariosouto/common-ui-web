import { classNames } from "../../../utils/classNames";
import { Tag } from "../Tag/Tag";

// TODO: Add a mask library
export interface TextMaskProtocol<Config = unknown> {
  mask: (value: string, config?: Config) => string;
  unmask: (value: string, config?: Config) => string;
}

interface InputTextPrimalProps<Config = unknown> {
  className?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // mask={[masks.money, { currency, lang: "en-US" }]}
  mask?: [TextMaskProtocol<Config>, Config];
}
export function InputTextPrimal<Config>({
  className,
  onChange,
  defaultValue,
  mask,
  ...props
}: InputTextPrimalProps<Config>) {
  const [receveidMask, maskConfig] = mask ?? [];

  return (
    <Tag
      as="input"
      type="text"
      placeholder="Type something..."
      className={classNames(
        "border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground",
        className,
      )}
      onChange={(e) => {
        if(receveidMask) {
          const maskedValue = receveidMask.mask(e.target.value, maskConfig);
          e.target.value = maskedValue;
        }
        onChange?.(e);
      }}
      defaultValue={defaultValue}
      {...props}
    />
  );
}