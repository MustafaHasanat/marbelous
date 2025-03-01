const completeDate = (numString: string): string => {
    return ["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(numString)
        ? `0${numString}`
        : numString;
};

const getModifiedYear = (year: string) => {
    const remaining = 4 - year.length;
    return `${"0".repeat(remaining)}${year}`;
};

export const dateToISO = ({
    type,
    dateNumbers,
    dateString,
    corrector = 0,
}: {
    corrector?: number;
    dateString?: string;
    dateNumbers?: {
        day: number;
        month: number;
        year: number;
    };
    type: "dateString" | "numbers";
}) => {
    let date: Date;

    if (type === "numbers" && dateNumbers) {
        date = new Date(dateNumbers?.year, dateNumbers?.month - 1 + corrector, dateNumbers?.day);
    } else if (type === "dateString" && dateString) {
        const temp = new Date(dateString);
        date = new Date(temp.getFullYear(), temp.getMonth() + 1 + corrector, temp.getDate());
    } else {
        return "";
    }

    const localDate = date.toLocaleString().split(",")[0];
    const [localDay, localMonth, localYear] = localDate.split("/");
    const modifiedYear = localYear.length < 4 ? getModifiedYear(localYear) : localYear;
    const final = `${modifiedYear}-${completeDate(localDay)}-${completeDate(localMonth)}`;

    return final;
};

export const dateToLocalTime = (date: string): string => {
    if (!date) return "invalid";

    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_dayMonth, time] = formattedDate.split(", ");

    return time.toLowerCase();
};

export const dateToPostDate = (date: string): string => {
    if (!date) return "invalid";

    const formattedDate = new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });

    const [dayMonth, time] = formattedDate.split(", ");

    return `${dayMonth} at ${time.toLowerCase()}`;
};

export const dateToTimeAgo = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const secondsPast = Math.floor((now.getTime() - then.getTime()) / 1000);

    if (secondsPast < 60) {
        return `${secondsPast} seconds ago`;
    }
    if (secondsPast < 3600) {
        const minutes = Math.floor(secondsPast / 60);
        return `${minutes} minutes ago`;
    }
    if (secondsPast < 86400) {
        const hours = Math.floor(secondsPast / 3600);
        return `${hours} hours ago`;
    }
    if (secondsPast < 2592000) {
        const days = Math.floor(secondsPast / 86400);
        return `${days} days ago`;
    }
    if (secondsPast < 31536000) {
        const months = Math.floor(secondsPast / 2592000);
        return `${months} months ago`;
    }
    const years = Math.floor(secondsPast / 31536000);
    return `${years} years ago`;
};

export const dateToTime = (dateString?: string) => {
    if (!dateString) return "Invalid date";

    const date = new Date(dateString).toLocaleTimeString();
    const [time, period] = date.split(" ");

    return `${time.slice(0, 5)} ${period}`;
};

export const convertImageName = (fileName: string): string => {
    const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];

    // Extract the file extension
    const extension = fileName.slice(fileName.lastIndexOf(".")).toLowerCase();

    // Check if the extension is valid
    if (validExtensions.includes(extension)) {
        return `abc${extension}`;
    } else {
        // If the extension is not valid, return null or handle the case
        return fileName;
    }
};

export const queryStringToObject = (queryString: string) => {
    return queryString
        ?.split("&")
        ?.map((param) => param.split("="))
        ?.reduce((acc: Record<string, string>, [key, value]) => {
            const decodedKey = decodeURIComponent(key);
            const decodedValue = decodeURIComponent(value);

            // Always override the value for the key if it already exists
            acc[decodedKey] = decodedValue;
            return acc;
        }, {});
};

/**
 * Find the item that occurs in one comma-separated string and not the other
 *
 * @param string1 comma-separated string
 * @param string2 comma-separated string
 * @returns the missing item from the shorter string
 */
export const findMissingItems = (string1: string, string2: string) => {
    const array1 = string1.split(",")?.map((item) => item.trim());
    const array2 = string2.split(",")?.map((item) => item.trim());

    const [longerArray, shorterArray] =
        array1.length > array2.length ? [array1, array2] : [array2, array1];

    const missingItems = longerArray.filter((item) => !shorterArray.includes(item));

    return missingItems?.length > 0 ? missingItems[0] : "";
};
