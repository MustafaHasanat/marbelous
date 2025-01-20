"use client";

import React, { CSSProperties } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Control, Controller } from "react-hook-form";
import { useLocale } from "@/lib/hooks";
import { cn, Input, InputProps } from "@heroui/react";

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any, any>;
    name: string;
    className?: string;
    styles?: CSSProperties;
}

export const PasswordInput: React.FC<
    React.HTMLAttributes<HTMLInputElement> & Props & InputProps
> = ({ control, name, className = "", styles = {}, ...rest }: Props) => {
    const { locale } = useLocale();
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { invalid, error } }) => (
                <Input
                    type={isVisible ? "text" : "password"}
                    labelPlacement={"outside"}
                    radius="sm"
                    variant="bordered"
                    isInvalid={invalid}
                    errorMessage={error?.message || "The value is invalid!"}
                    style={{
                        ...styles,
                    }}
                    className={cn("w-full", className)}
                    classNames={{
                        label: cn(
                            "text-[16px] font-bold capitalize",
                            locale === "en" ? "left-4" : "right-4",
                        ),
                        description: "text-[14px]",
                    }}
                    endContent={
                        <button
                            className={cn("focus:outline-none")}
                            type="button"
                            onClick={toggleVisibility}
                        >
                            {isVisible ? (
                                <EyeOff
                                    className={cn(
                                        "text-2xl pointer-events-none",
                                        invalid ? "text-danger" : "text-default-400",
                                    )}
                                />
                            ) : (
                                <Eye
                                    className={cn(
                                        "text-2xl pointer-events-none",
                                        invalid ? "text-danger" : "text-default-400",
                                    )}
                                />
                            )}
                        </button>
                    }
                    {...field}
                    {...rest}
                />
            )}
        />
    );
};
