
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
      className={className}
    />
  );
}