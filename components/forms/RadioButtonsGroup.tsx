"use client";

import React, { CSSProperties } from "react";
import { RadioGroup, Radio, cn, SlotsToClasses } from "@nextui-org/react";
import { Control, Controller } from "react-hook-form";
import { RadioItemType } from "forms";
import { SharedText } from "../shared/SharedText";

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any>;
    name: string;
    radioButtons: RadioItemType[];
    label?: string;
    orientation?: "horizontal" | "vertical";
    className?: string;
    itemClassName?: string;
    classNames?:
        | SlotsToClasses<"base" | "label" | "description" | "errorMessage" | "wrapper">
        | undefined;
    tObject?: { [key: string]: string };
    style?: CSSProperties;
}

export const RadioButtonsGroup = ({
    name,
    label,
    control,
    className = "",
    itemClassName = "",
    classNames = {},
    radioButtons,
    orientation = "horizontal",
    tObject,
    style = {},
}: Props) => {
    const { ...restClassNames } = classNames;

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <div className={cn("flex flex-col gap-3", className)} style={style}>
                    <RadioGroup
                        label={label}
                        className={cn(
                            "flex, gap-3",
                            orientation === "horizontal" ? "flex-row" : "flex-col",
                        )}
                        classNames={{
                            ...restClassNames,
                        }}
                        {...field}
                    >
                        {radioButtons?.map(({ value, label }) => (
                            <Radio
                                key={value}
                                value={value.toString()}
                                className={cn("capitalize", itemClassName)}
                            >
                                {tObject ? tObject[label] : label}
                            </Radio>
                        ))}
                    </RadioGroup>

                    {error && <SharedText className="text-danger">{error?.message}</SharedText>}
                </div>
            )}
        />
    );
};
