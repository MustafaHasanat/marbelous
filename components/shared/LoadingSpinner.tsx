"use client";

import { useLocale } from "@/lib/hooks";
import { cn, Spinner, SpinnerProps } from "@nextui-org/react";
import React, { useMemo } from "react";

interface Props {
    isFullPage?: boolean;
    isHalfPage?: boolean;
    label?: string;
    isLabeled?: boolean;
    className?: string;
}

const Component: React.FC<{ label: string & SpinnerProps }> = ({ label, ...rest }) => (
    <Spinner
        label={label}
        color="primary"
        labelColor="primary"
        size="lg"
        className="m-auto"
        {...rest}
    />
);

export const LoadingSpinner: React.FC<Props & SpinnerProps> = React.memo(
    ({ isFullPage, isHalfPage, label, className, isLabeled = true, ...rest }) => {
        const { t } = useLocale();

        const loadingLabel = useMemo(
            () => (isLabeled ? label || t.global.loading : ""),
            [isLabeled, label, t],
        );

        if (isFullPage)
            return (
                <div
                    className={cn(
                        "flex justify-center items-center w-[100vw] h-[100vh]",
                        className,
                    )}
                >
                    <Component label={loadingLabel} {...rest} />
                </div>
            );

        if (isHalfPage)
            return (
                <div className={cn("flex justify-center items-center w-full h-[60vh]", className)}>
                    <Component label={loadingLabel} {...rest} />
                </div>
            );

        return <Component label={loadingLabel} {...rest} />;
    },
);

export default LoadingSpinner;
