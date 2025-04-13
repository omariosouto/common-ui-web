import React, { JSX } from "react";

interface TextProps {
  tag?: string;
  className?: string;
  children: React.ReactNode;
}
export function Text({
  children,
  className,
}: TextProps) {
  const Tag = "p" as keyof JSX.IntrinsicElements;

  return <Tag className={className}>{children}</Tag>;
}