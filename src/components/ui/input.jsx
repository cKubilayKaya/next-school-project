import * as React from "react";

import { cn } from "@/lib/utils";
import { SearchIcon } from "../Icons/Icons";

function Input({ className, type, icon, ...props }) {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute top-1/2 left-3 -translate-y-1/2">
          <SearchIcon size={20} color="#969eac" />
        </div>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn({
          "border border-transparent file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-12 w-full min-w-0 rounded-md bg-gray-700 px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm": true,
          "focus:border focus:border-gray-500 transition duration-300 ": true,
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive": true,
          "pl-10": icon,
          className,
        })}
        {...props}
      />
    </div>
  );
}

export { Input };
