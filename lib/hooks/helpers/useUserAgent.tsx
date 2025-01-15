"use client";

import { useEffect, useState } from "react";

type DeviceType = "none" | "windows" | "ios" | "android" | "mac";

/**
 * The user-agent is a string value determines the current device that access the 
 * web page, this hook compared 
 * 
 * @param userAgent the "user-agent" header coming from the device
 * 
 * @returns the "currentDevice" accessing the device 
 */
export const useUserAgent = ({ userAgent }: { userAgent: string | null }) => {
    const [currentDevice, setCurrentDevice] = useState<DeviceType>("none");

    useEffect(() => {
        if (!userAgent) return;

        if (userAgent.indexOf("Windows") !== -1 || userAgent.indexOf("windows") !== -1)
            setCurrentDevice("windows");
        else if (userAgent.indexOf("Android") !== -1 || userAgent.indexOf("android") !== -1)
            setCurrentDevice("android");
        else if (userAgent.indexOf("IOS") !== -1 || userAgent.indexOf("ios") !== -1)
            setCurrentDevice("ios");
        else if (userAgent.indexOf("MAC") !== -1 || userAgent.indexOf("mac") !== -1)
            setCurrentDevice("mac");
    }, [userAgent]);

    return { currentDevice };
};
