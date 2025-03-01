"use client";

import React, { ReactNode, useId } from "react";
import Hero from "@/public/images/hero.png";
import Logo from "@/public/images/marbelous-no-bg-logo.png";
import Image from "next/image";
import { useLocale } from "@/lib/hooks";
import { ItemsListing, MakeOrderButton, SharedText } from "@/components";
import { Award, CircleDollarSign, HandHeart } from "lucide-react";

const HomePage = React.memo(() => {
    const { t } = useLocale();
    const id = useId();

    const iconClassName = "w-[80px] tablet:w-[130px] h-[80px] tablet:h-[130px] m-auto";

    const values: {
        text: string;
        image: ReactNode;
    }[] = [
        {
            text: t.guest.home.values.value1,
            image: <Award className={iconClassName} />,
        },
        {
            text: t.guest.home.values.value2,
            image: <HandHeart className={iconClassName} />,
        },
        {
            text: t.guest.home.values.value3,
            image: <CircleDollarSign className={iconClassName} />,
        },
    ];

    return (
        <>
            <section className="relative w-full flex h-[calc(100vh_-_70px)]">
                <Image
                    src={Hero}
                    alt="Hero"
                    className="w-full h-auto object-cover"
                    width={1000}
                    height={500}
                    priority
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent opacity-90"></div>

                <div className="absolute w-full tablet:w-[80%] h-full top-0 left-[50%] -translate-x-[50%] grid tablet:grid-cols-[60%_auto] gap-4 items-center text-white font-bold px-5">
                    <div className="flex flex-col justify-center items-center tablet:items-start gap-5">
                        <SharedText className="text-[50px] text-center tablet:text-start">
                            {t.guest.home.hero.brandName}
                        </SharedText>
                        <SharedText className="text-[20px] opacity-80 text-center tablet:text-start">
                            {t.guest.home.hero.slogan1}
                        </SharedText>
                        <SharedText className="text-[18px] opacity-80 text-center tablet:text-start">
                            {t.guest.home.hero.slogan2}
                        </SharedText>
                        <MakeOrderButton className="w-fit" isIconOnly={false} />
                    </div>

                    <Image
                        id="hero-logo"
                        src={Logo}
                        alt="Logo"
                        width={1500}
                        height={1500}
                        className="mx-auto tablet:ms-auto w-[150px] tablet:w-[250px]"
                    />
                </div>
            </section>

            <section className="bg-white text-primary flex flex-col gap-14 justify-center items-center py-14">
                <SharedText className="text-[30px] font-bold hover:opacity-70 transition-opacity">
                    {t.guest.home.values.title}
                </SharedText>

                <div className="w-full flex flex-col tablet:flex-row gap-5 justify-center mx-auto">
                    {values?.map(({ image, text }, index) => (
                        <div
                            key={index + id}
                            className="flex flex-col gap-3 items-center justify-center w-[80vw] mx-auto tablet:mx-[unset] tablet:w-[25vw]"
                        >
                            {image}

                            <SharedText className="font-bold w-[50%] text-center">
                                {text}
                            </SharedText>
                        </div>
                    ))}
                </div>
            </section>

            <section className="text-primary flex flex-col gap-14 justify-center items-center py-14 border-t border-primary">
                <SharedText className="text-[30px] font-bold hover:opacity-70 transition-opacity">
                    {t.guest.home.previousWork.title}
                </SharedText>

                <ItemsListing isOnlyFeatured />
            </section>
        </>
    );
});

export default HomePage;
