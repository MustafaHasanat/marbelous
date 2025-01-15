"use client";

import React, { FC, ReactNode } from "react";
import { Control, Controller } from "react-hook-form";
import {
    Button,
    Chip,
    Divider,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Select,
    SelectItem,
    SelectProps,
} from "@nextui-org/react";
import { SelectItemType } from "forms";
import { Plus } from "lucide-react";
import { useLocale } from "@/lib/hooks";
import { SharedText } from "../shared/SharedText";

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<any, any>;
    name: string;
    options: SelectItemType[];
    modal?: {
        header: ReactNode;
        body: ReactNode;
        footer: ReactNode;
        isOpen: boolean;
        onOpen: () => void;
        onOpenChange: () => void;
    };
    label?: string;
    placeholder?: string;
    defaultValue?: string;
}

export const DynamicMultiSelect: FC<Omit<SelectProps, "children"> & Props> = React.memo(
    ({ control, name, label, placeholder, options, defaultValue, modal, ...rest }) => {
        const { t } = useLocale();

        return (
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                render={({
                    field: { onChange, value, ...restField },
                    fieldState: { invalid, error },
                }) => (
                    <div className="flex flex-col gap-1">
                        <SharedText className="text-[16px] font-bold">{label}</SharedText>

                        <Select
                            items={options}
                            labelPlacement="outside"
                            variant="bordered"
                            selectionMode="multiple"
                            isInvalid={invalid}
                            label={label}
                            placeholder={placeholder}
                            classNames={{
                                base: "!mt-0 justify-center font-bold text-[16px] h-auto",
                                label: "hidden",
                                description: "text-[14px]",
                                listbox: "capitalize",
                                errorMessage: "hidden",
                                trigger: "h-auto !p-[10px]",
                            }}
                            onSelectionChange={(event) => {
                                onChange(Array.from(event));
                            }}
                            selectedKeys={value}
                            renderValue={(options) => {
                                return (
                                    <div className="flex flex-wrap gap-2">
                                        {options?.map((option) => (
                                            <Chip color="secondary" key={option.key}>
                                                {option?.textValue}
                                            </Chip>
                                        ))}
                                    </div>
                                );
                            }}
                            errorMessage={error?.message}
                            endContent={
                                <Button
                                    isIconOnly
                                    color="primary"
                                    variant="bordered"
                                    startContent={<Plus size={15} />}
                                    onPress={modal?.onOpen}
                                    className="p-1 h-fit w-fit min-w-fit rounded-lg"
                                />
                            }
                            {...restField}
                            {...rest}
                        >
                            {options?.map(({ value, label }) => (
                                <SelectItem key={value}>{label}</SelectItem>
                            ))}
                        </Select>

                        {/* new item modal */}
                        <Modal
                            isOpen={modal?.isOpen}
                            onOpenChange={modal?.onOpenChange}
                            placement="center"
                            size="3xl"
                        >
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader>{modal?.header}</ModalHeader>
                                        <Divider />
                                        <ModalBody>{modal?.body}</ModalBody>
                                        <Divider />
                                        <ModalFooter>
                                            <Button
                                                color="danger"
                                                variant="bordered"
                                                onPress={onClose}
                                            >
                                                cancel
                                            </Button>

                                            {modal?.footer}
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </div>
                )}
                {...rest}
            />
        );
    },
);
