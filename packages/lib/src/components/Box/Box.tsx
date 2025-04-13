import React, { JSX } from "react";

interface BoxProps {
  tag?: string;
  children: React.ReactNode;
}
export function Box({
  children
}: BoxProps) {
  const Tag = "div" as keyof JSX.IntrinsicElements;

  return <Tag>{children}</Tag>;
}