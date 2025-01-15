import ar from "../locales/ar";
import en from "../locales/en";
import { i18n } from "../locales/i18n.config";

export type StorePayload<PayloadType> = {
    payload: PayloadType;
};

export type Locale = (typeof i18n)["locales"][number];

export type TranslateObject = typeof ar | typeof en;
