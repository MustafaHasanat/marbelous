"use client";

import React, { FC } from "react";
import { Control, Controller } from "react-hook-form";
import { cn, Select, SelectItem, SelectProps, SlotsToClasses } from "@nextui-org/react";
import { SelectItemType } from "forms";

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any, any>;
    name: string;
    label?: string;
    className?: string;
    placeholder?: string;
    defaultValue?: string;
    options: SelectItemType[];
    preOnChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    additionalOnChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    classNames?:
        | SlotsToClasses<
              | "description"
              | "errorMessage"
              | "label"
              | "base"
              | "value"
              | "selectorIcon"
              | "mainWrapper"
              | "trigger"
              | "innerWrapper"
              | "spinner"
              | "listboxWrapper"
              | "listbox"
              | "popoverContent"
              | "helperWrapper"
          >
        | undefined;
}

export const SharedSelect: FC<Omit<SelectProps, "children"> & Props> = React.memo(
    ({
        control,
        className,
        name,
        label,
        placeholder,
        options,
        classNames = {},
        defaultValue,
        preOnChange,
        additionalOnChange,
        ...rest
    }) => {
        const {
            base,
            label: labelClassName,
            description,
            listbox,
            value: valueClassName,
            errorMessage,
            trigger,
            ...restClassNames
        } = classNames;

        return (
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                render={({ field: { onChange, value, ...restField }, fieldState: { invalid } }) => (
                    <Select
                        items={options}
                        labelPlacement="outside"
                        variant="bordered"
                        isInvalid={invalid}
                        label={label}
                        placeholder={placeholder}
                        className={cn(className)}
                        classNames={{
                            base: cn("!mt-4 justify-center font-bold text-[16px]", base),
                            label: cn(labelClassName),
                            description: cn("text-[14px]", description),
                            listbox: cn("capitalize", listbox),
                            value: cn(valueClassName),
                            errorMessage: cn("hidden", errorMessage),
                            trigger: cn(trigger),
                            ...restClassNames,
                        }}
                        onChange={(event) => {
                            preOnChange && preOnChange(event);
                            onChange(event);
                            additionalOnChange && additionalOnChange(event);
                        }}
                        selectedKeys={[value]}
                        {...restField}
                        {...rest}
                    >
                        {options?.map(({ value, label }) => (
                            <SelectItem key={value}>{label}</SelectItem>
                        ))}
                    </Select>
                )}
            />
        );
    },
);
