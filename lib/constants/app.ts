import { Metadata } from "next";

export const FRONTEND_BASE = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN;
export const FRONTEND_API_BASE = `${process.env.NEXT_PUBLIC_FRONTEND_DOMAIN}api/`;
export const BACKEND_BASE = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}`;

export const CACHE_KEY_NAME = "cache-key";
export const CACHE_KEY_VALUE = "abc1234567"; // ! don't change this unless you want to clear your users' cache

export const PAGE_SIZE_OBJ = {};

export const SCREENS = {
    mobile: 412,
    tablet: 820,
    laptop: 1240,
    desktop: 1500,
};

export const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export const monthsMapping: { [key: string]: string } = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
};

// * website metadata

const title = "Marbelous";
const description = "Marbelous Website";
const icon = "/favicon.svg";
export const MARBELOUS_IMAGE_URL =
    "https://kaiser-leap.atlassian.net/rest/api/2/universal_avatar/view/type/project/avatar/10668?size=xxlarge";
const imageType = "image/png";
const siteName = "Marbelous";

const images = {
    url: MARBELOUS_IMAGE_URL,
    type: imageType,
};

export const appMetadata: Metadata = {
    title,
    description,
    icons: {
        icon,
    },
    openGraph: {
        title,
        description,
        images,
        siteName,
        type: "website",
    },
    twitter: {
        title,
        description,
        images,
        card: "summary_large_image",
    },
};
