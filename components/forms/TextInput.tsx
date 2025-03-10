"use client";

import { useLocale } from "@/lib/hooks";
import { Input, InputProps } from "@heroui/react";
import { cn, SlotsToClasses } from "@heroui/theme";
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

export const TextInput: React.FC<React.HTMLAttributes<HTMLInputElement> & Props & InputProps> = ({
    control,
    name,
    className = "",
    classNames = {},
    styles = {},
    ...rest
}: Props) => {
    const { t } = useLocale();
    const { locale } = useLocale();
    const { label, description, ...restClassNames } = classNames;

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { invalid, error } }) => (
                <Input
                    type="text"
                    labelPlacement={"outside"}
                    isInvalid={invalid}
                    variant="bordered"
                    errorMessage={error?.message || "The value is invalid!"}
                    placeholder={t.global.textPlaceholder}
                    style={{
                        ...styles,
                    }}
                    className={cn("w-full", className)}
                    classNames={{
                        label: cn(
                            "font-bold text-[16px]",
                            locale === "en" ? "left-4" : "right-4",
                            label,
                        ),
                        description: cn("text-[14px]", description),
                        ...restClassNames,
                    }}
                    {...field}
                    {...rest}
                />
            )}
        />
    );
};
