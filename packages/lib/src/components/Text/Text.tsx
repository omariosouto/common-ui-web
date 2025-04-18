import React, { JSX } from "react";

interface TextProps {
  tag?: string;
  className?: string;
  children: React.ReactNode;
}
export function Text({
  tag,
  children,
  className,
}: TextProps) {
  const Tag = tag as keyof JSX.IntrinsicElements || "p" as keyof JSX.IntrinsicElements;

  return <Tag className={className}>{children}</Tag>;
}