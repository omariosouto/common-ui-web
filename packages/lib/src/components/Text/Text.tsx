import React, { JSX } from "react";

interface TextProps {
  tag?: string;
  children: React.ReactNode;
}
export function Text({
  children
}: TextProps) {
  const Tag = "p" as keyof JSX.IntrinsicElements;

  return <Tag>{children}</Tag>;
}