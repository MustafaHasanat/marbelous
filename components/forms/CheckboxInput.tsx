"use client";

import { CheckboxProps } from "@nextui-org/checkbox";
import { Checkbox } from "@nextui-org/react";
import React, { CSSProperties } from "react";
import { Control, Controller } from "react-hook-form";

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any, any>;
    name: string;
    children: React.ReactNode;
    className?: string;
    styles?: CSSProperties;
}

export const CheckboxInput: React.FC<
    React.HTMLAttributes<HTMLInputElement> & Props & CheckboxProps
> = ({ control, name, children, className = "", styles = {}, ...rest }: Props) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { invalid } }) => (
                <Checkbox
                    isInvalid={invalid}
                    style={{
                        ...styles,
                    }}
                    className={`grid grid-cols-[auto_auto] gap-3 w-fit ${className}`}
                    {...field}
                    {...rest}
                >
                    {children}
                </Checkbox>
            )}
        />
    );
};
