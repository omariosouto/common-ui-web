import React, { JSX } from "react";

interface BoxProps {
  tag?: string;
  className?: string;
  children: React.ReactNode;
}
export function Box({
  tag,
  children,
  className,
}: BoxProps) {
  const Tag = tag as keyof JSX.IntrinsicElements || "div" as keyof JSX.IntrinsicElements;

  return <Tag className={className}>{children}</Tag>;
}