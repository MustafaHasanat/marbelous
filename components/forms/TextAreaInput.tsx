"use client";

import { cn, SlotsToClasses, Textarea, TextAreaProps } from "@heroui/react";
import React, { CSSProperties } from "react";
import { Control, Controller } from "react-hook-form";

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any, any>;
    name: string;
    styles?: CSSProperties;
    className?: string;
    classNames?:
        | SlotsToClasses<
              | "input"
              | "base"
              | "label"
              | "description"
              | "errorMessage"
              | "mainWrapper"
              | "inputWrapper"
              | "innerWrapper"
              | "clearButton"
              | "helperWrapper"
          >
        | undefined;
}

export const TextAreaInput: React.FC<
    React.HTMLAttributes<HTMLInputElement> & Props & TextAreaProps
> = ({ control, name, className = "", classNames = {}, styles = {}, ...rest }: Props) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { invalid, error } }) => (
                <Textarea
                    type="text"
                    labelPlacement={"outside"}
                    label=""
                    description=""
                    variant="bordered"
                    isInvalid={invalid}
                    errorMessage={error?.message || "The value is invalid!"}
                    style={{
                        ...styles,
                    }}
                    className={cn("w-full", className)}
                    classNames={{
                        input: "bg-[transparent] text-[18px]",
                        inputWrapper: "bg-ash rounded-[16px]",
                        label: cn("font-bold text-[16px] capitalize"),
                        description: "text-[14px]",
                        ...classNames,
                    }}
                    {...field}
                    {...rest}
                />
            )}
        />
    );
};
