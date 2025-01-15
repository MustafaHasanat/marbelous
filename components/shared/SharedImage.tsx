"use client";

import { CSSProperties, useEffect, useState } from "react";
import Image from "next/image";
import placeholderImage from "@/public/images/image-placeholder.png";
import { cn } from "@nextui-org/theme";

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    src: any;
    alt?: string;
    className?: string;
    imageClassName?: string;
    containerStyle?: CSSProperties;
    imageStyles?: CSSProperties;
    width?: number | undefined;
    height?: number | undefined;
    priority?: boolean;
}

export const SharedImage: React.FC<React.HTMLAttributes<HTMLDivElement> & Props> = ({
    alt = "image",
    src,
    priority = false,
    className = "",
    imageClassName = "",
    containerStyle = {},
    imageStyles = {},
    width = undefined,
    height = undefined,
    ...rest
}) => {
    const [imageSrc, setImageSrc] = useState(src);

    const errorHandler = () => {
        setImageSrc(placeholderImage);
    };

    useEffect(() => {
        setImageSrc(src);
    }, [src]);

    return (
        <div
            className={cn("flex flex-col justify-center items-center", className)}
            style={containerStyle}
            {...rest}
        >
            <Image
                src={imageSrc || placeholderImage}
                alt={alt}
                width={width}
                height={height}
                onError={errorHandler}
                priority={priority}
                style={{
                    height: "100%",
                    width: "auto",
                    ...imageStyles,
                }}
                className={cn("", imageClassName)}
            />
        </div>
    );
};
