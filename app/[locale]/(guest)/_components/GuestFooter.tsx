"use client";

import { MakeOrderButton, SharedText } from "@/components";
import { useLocale } from "@/lib/hooks";
import { Button } from "@heroui/react";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import React, { useId } from "react";

const GuestFooter = React.memo(() => {
    const { t } = useLocale();
    const id = useId();

    const socials = [
        {
            icon: <Facebook />,
            url: "",
            isDisabled: true,
        },
        {
            icon: <Instagram />,
            url: "",
            isDisabled: true,
        },
        {
            icon: <Linkedin />,
            url: "",
            isDisabled: true,
        },
    ];

    return (
        <footer className="w-full min-h-[70px] h-fit flex flex-col gap-8 items-center justify-center overflow-hidden px-5 py-14 bg-white border-t border-primary">
            <div className="w-full flex flex-col-reverse tablet:flex-row justify-center items-center tablet:justify-around gap-5">
                <div className="flex items-center gap-3">
                    {socials?.map(({ icon, isDisabled, url }, index) => (
                        <Button
                            key={id + index}
                            isDisabled={isDisabled}
                            onPress={() => window.open(url, "_blank")}
                            color="primary"
                            isIconOnly
                            startContent={icon}
                        />
                    ))}
                </div>

                <MakeOrderButton isIconOnly={false} />
            </div>

            <SharedText className="flex flex-col tablet:flex-row gap-1 font-bold text-center">
                <span>&copy; {new Date().getFullYear()}</span>
                <span>{t.guest.footer.copyRights}</span>
            </SharedText>
        </footer>
    );
});

export default GuestFooter;
