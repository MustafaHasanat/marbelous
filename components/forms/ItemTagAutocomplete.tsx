"use client";

import { useLocale } from "@/lib/hooks";
import React, { FC } from "react";
import { Control, Controller } from "react-hook-form";
import {
    Autocomplete,
    AutocompleteItem,
    AutocompleteProps,
    Chip,
    cn,
    SlotsToClasses,
} from "@heroui/react";
import { ItemTag } from "@/lib/enums";

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any, any>;
    className?: string;
    classNames?:
        | SlotsToClasses<
              | "base"
              | "selectorIcon"
              | "mainWrapper"
              | "innerWrapper"
              | "spinner"
              | "listboxWrapper"
              | "listbox"
              | "popoverContent"
              | "helperWrapper"
          >
        | undefined;
    placeholder?: string;
}

export const ItemTagAutocomplete: FC<Omit<AutocompleteProps, "children"> & Props> = React.memo(
    ({ control, className, classNames = {}, placeholder, ...rest }) => {
        const { t } = useLocale();

        return (
            <Controller
                control={control}
                name={t.guest.home.previousWork.itemTag.name}
                render={({ field, fieldState: { invalid } }) => (
                    <Autocomplete
                        labelPlacement="outside"
                        variant="bordered"
                        isInvalid={invalid}
                        label={t.guest.home.previousWork.itemTag.label}
                        placeholder={placeholder}
                        className={cn(className)}
                        classNames={{
                            base: "w-full h-auto",
                            ...classNames,
                        }}
                        selectedKey={field?.value?.toString()}
                        onSelectionChange={field?.onChange}
                        {...field}
                        {...rest}
                    >
                        {Object.values(ItemTag)?.map((value) => (
                            <AutocompleteItem key={value?.toString()} textValue={value}>
                                {value}
                            </AutocompleteItem>
                        ))}
                    </Autocomplete>
                )}
            />
        );
    },
);
