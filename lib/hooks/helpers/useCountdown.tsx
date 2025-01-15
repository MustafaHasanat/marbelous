"use client";

import { useEffect, useState } from "react";

interface Props {
    initialSeconds: number;
}

export const useCountdown = ({ initialSeconds }: Props) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [timeString, setTimeString] = useState("00:00");

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    };

    useEffect(() => {
        setTimeString(formatTime(seconds));

        if (seconds > 0) {
            const intervalId = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [seconds]);

    useEffect(() => {
        setSeconds(initialSeconds);
    }, [initialSeconds]);

    return { timeString, isTimedOut: seconds === 0 };
};
