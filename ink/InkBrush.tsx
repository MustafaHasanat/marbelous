"use client";

import { SharedText } from "@/components";
import React, { useId, useState } from "react";
import { useInkContext } from "./useInkContext";
import { useRunOnce } from "@/lib/hooks";
import { InkMode } from "./types";

const InkBrush = React.memo(() => {
    const [componentOption, setComponentOption] = useState<string>("");
    const [langOption, setLangOption] = useState<string>("");
    const { components, currentComponentKey, mode, setCurrentComponentKey, setMode } =
        useInkContext();
    const uniqueId = useId();

    useRunOnce({
        fn: () => {
            setMode("view");
        },
    });

    const handleComponentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setComponentOption(event.target.value);
        setCurrentComponentKey(event.target.value);
    };

    const handleLangChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLangOption(event.target.value);
    };

    const handleEditModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setMode(event.target.value as InkMode);
    };

    return (
        <div className="w-[100vw] h-[100vh] flex flex-col">
            <header className="bg-primary w-full flex items-center justify-between gap-3 px-5 h-[70px] text-white">
                <SharedText className="font-bold">Components</SharedText>

                <div className="flex items-center gap-3">
                    <select
                        value={componentOption}
                        onChange={handleComponentChange}
                        className="border p-2 rounded-md text-black bg-white"
                    >
                        <option value="">Select a component</option>

                        {Object.entries(components)?.map(([key, { label }], index) => (
                            <option key={index + uniqueId} value={key}>
                                {label}
                            </option>
                        ))}
                    </select>

                    <select
                        value={mode}
                        onChange={handleEditModeChange}
                        className="border p-2 rounded-md text-black bg-white"
                    >
                        <option key={"view" + uniqueId} value="view">
                            View
                        </option>

                        <option key={"edit" + uniqueId} value="edit">
                            Edit
                        </option>
                    </select>

                    <select
                        value={langOption}
                        onChange={handleLangChange}
                        className="border p-2 rounded-md text-black bg-white"
                    >
                        <option key={"en" + uniqueId} value="en">
                            En
                        </option>

                        <option key={"ar" + uniqueId} value="ar">
                            Ar
                        </option>
                    </select>
                </div>
            </header>

            <main className="w-full h-full overflow-y-scroll flex justify-center items-center bg-background px-5 py-5">
                {currentComponentKey ? (
                    components[currentComponentKey]?.node
                ) : (
                    <SharedText>No component has been selected</SharedText>
                )}
            </main>
        </div>
    );
});

export default InkBrush;
