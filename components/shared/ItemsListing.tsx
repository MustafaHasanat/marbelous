"use client";

import { previousWorkImages } from "@/lib/constants";
import { ItemTag, Routs } from "@/lib/enums";
import { useLocale, useSuperRouter } from "@/lib/hooks";
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, cn, Divider } from "@heroui/react";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import React, { useId, useMemo } from "react";
import { useForm } from "react-hook-form";
import { TextInput, ItemTagAutocomplete } from "@/components";

interface Params {
    isOnlyFeatured?: boolean;
    className?: string;
}

export const ItemsListing = React.memo(({ className = "", isOnlyFeatured = false }: Params) => {
    const uniqueId = useId();
    const { locale, t } = useLocale();
    const { navigate } = useSuperRouter();

    const { control, watch, reset } = useForm<{
        name: string;
        tag: string;
    }>({
        mode: "all",
    });

    const formValues = watch();

    const refinedImages = useMemo(
        () =>
            previousWorkImages?.filter(({ name, tags, isFeatured }) => {
                if (isOnlyFeatured) {
                    return isFeatured;
                }

                const nameCondition = formValues?.name
                    ? name[locale].indexOf(formValues?.name) !== -1
                    : true;

                const tagCondition = formValues?.tag
                    ? tags.includes(formValues?.tag as ItemTag)
                    : true;

                if (nameCondition && tagCondition) {
                    return true;
                }

                return false;
            }),
        [previousWorkImages, formValues, isOnlyFeatured],
    );

    const onPress = (id: string) =>
        navigate({
            href: Routs.ITEM_DETAILS,
            replacements: {
                ITEM_ID: id,
            },
        });

    return (
        <div className={cn("w-full flex flex-col gap-10 justify-center items-center", className)}>
            {!isOnlyFeatured && (
                <div className="w-full grid grid-cols-1 tablet:grid-cols-[40%_40%_auto] gap-8 tablet:gap-4">
                    <TextInput
                        control={control}
                        name={t.guest.home.previousWork.itemName.name}
                        label={t.guest.home.previousWork.itemName.label}
                        classNames={{
                            inputWrapper: "bg-white",
                        }}
                    />

                    <ItemTagAutocomplete
                        control={control}
                        name={t.guest.home.previousWork.itemTag.name}
                    />

                    <Button
                        color="danger"
                        className="w-full tablet:w-fit px-8 mt-auto font-bold"
                        onPress={() =>
                            reset({
                                name: "",
                                tag: "",
                            })
                        }
                    >
                        {t.guest.home.previousWork.reset}
                    </Button>
                </div>
            )}

            <div
                className={
                    "w-full grid grid-cols-1 mobile:grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-6 px-5 gap-10"
                }
            >
                {refinedImages?.map(({ id, image, tags, name }, index) => (
                    <Card
                        key={name + uniqueId + index}
                        shadow="sm"
                        className="px-1 py-3 flex flex-col gap-2"
                        isPressable
                        onPress={() => onPress(id)}
                    >
                        <CardHeader className="max-h-[200px] overflow-hidden flex justify-center items-center">
                            <Image
                                src={image}
                                alt={name[locale]}
                                className="w-full object-contain"
                                width={200}
                                height={200}
                            />
                        </CardHeader>

                        <CardBody className="flex justify-center flex-wrap gap-3">
                            {tags?.map((tag, index) => (
                                <Chip
                                    key={tag + uniqueId + "tag" + index}
                                    className="font-bold"
                                    color="primary"
                                >
                                    {tag}
                                </Chip>
                            ))}
                        </CardBody>

                        <Divider className="w-[80%] mx-auto" />

                        <CardFooter className="flex justify-center">{name[locale]}</CardFooter>
                    </Card>
                ))}
            </div>

            {isOnlyFeatured && (
                <Button
                    variant="bordered"
                    color="primary"
                    className="w-fit font-bold"
                    endContent={<ImagePlus />}
                    onPress={() =>
                        navigate({
                            href: Routs.ITEMS,
                        })
                    }
                >
                    {t.guest.home.previousWork.seeMore}
                </Button>
            )}
        </div>
    );
});
