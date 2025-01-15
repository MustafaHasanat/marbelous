/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import { DatePicker, DatePickerProps } from "@nextui-org/react";
import { cn, SlotsToClasses } from "@nextui-org/theme";
import React, { CSSProperties } from "react";
import { Control, Controller } from "react-hook-form";
import { parseDate } from "@internationalized/date";
import { dateToISO } from "@/lib/utils";

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any, any>;
    name: string;
    styles?: CSSProperties;
    className?: string;
    classNames?:
        | (SlotsToClasses<
              | "base"
              | "label"
              | "description"
              | "selectorIcon"
              | "selectorButton"
              | "popoverContent"
              | "calendar"
              | "calendarContent"
              | "timeInputLabel"
              | "timeInput"
          > &
              SlotsToClasses<"input" | "segment">)
        | undefined;
}

export const DateInputPicker: React.FC<
    React.HTMLAttributes<HTMLInputElement> & Props & DatePickerProps
> = ({ control, name, className = "", classNames = {}, styles = {}, ...rest }: Props) => {
    const { calendar, base, ...restClassNames } = classNames;

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, ...restField }, fieldState: { invalid, error } }) => (
                <DatePicker
                    labelPlacement={"outside"}
                    isInvalid={invalid}
                    variant="bordered"
                    errorMessage={error?.message || "The value is invalid!"}
                    showMonthAndYearPickers
                    className={cn(className)}
                    classNames={{
                        base: cn("w-full", base),
                        label: cn("font-bold text-[16px] capitalize"),
                        calendar: cn(calendar),
                        ...restClassNames,
                    }}
                    style={{
                        ...styles,
                    }}
                    onChange={(e) => {
                        e &&
                            onChange(
                                parseDate(
                                    dateToISO({
                                        type: "numbers",
                                        dateNumbers: {
                                            day: e?.day,
                                            month: e?.month,
                                            year: e?.year,
                                        },
                                    }),
                                ),
                            );
                    }}
                    {...restField}
                    {...rest}
                />
            )}
        />
    );
};
