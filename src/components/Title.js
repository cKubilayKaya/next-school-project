import { cn } from "@/lib/utils";
import React from "react";

export default function Title({ title, size = "sm" }) {
  return (
    <h3
      className={cn({
        [`text-${size} font-quando`]: true,
      })}
    >
      {title}
    </h3>
  );
}
