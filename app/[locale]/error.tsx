"use client"; // Error boundaries must be Client Components

import { SharedImage, SharedText } from "@/components";
import { useEffect, useState } from "react";
import Logo from "@/public/icons/logo.png";
import { useLocale, useSuperRouter } from "@/lib/hooks";
import { Routs } from "@/lib/enums";
import { Button, cn, Divider } from "@heroui/react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const [errorData, setErrorData] = useState<Error & { digest?: string }>();
    const { t } = useLocale();
    const { navigate } = useSuperRouter();

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
        setErrorData(error);
    }, [error]);

    return (
        <div
            className={cn(
                "w-[100vw] h-[100vh] flex flex-col justify-center items-center gap-7 p-10 overflow-hidden",
            )}
        >
            <SharedImage src={Logo} alt="logo" width={500} height={300} />

            <SharedText className="text-center w-[400px] text-[30px] font-bold">
                {t.global.error.errorMessage}
            </SharedText>

            <SharedText className="text-center text-[20px] text-danger">
                {errorData?.message}
            </SharedText>

            <Divider className="w-[400px]" />

            <div className="grid grid-cols-2 w-[300px] gap-5">
                <Button
                    color="primary"
                    onPress={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
                    {t.global.error.tryAgain}
                </Button>

                <Button color="primary" onPress={() => window.location.reload()}>
                    {t.global.error.reload}
                </Button>

                <Button
                    color="primary"
                    onPress={() =>
                        navigate({
                            href: Routs.HOME,
                        })
                    }
                >
                    {t.global.buttons.goToHome}
                </Button>

                <Button
                    color="primary"
                    onPress={() =>
                        navigate({
                            href: Routs.LOGIN,
                        })
                    }
                >
                    {t.global.buttons.goToLogin}
                </Button>
            </div>
        </div>
    );
}
