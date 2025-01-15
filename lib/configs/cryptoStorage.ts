import CryptoJS from "crypto-js";
const ENCRYPTION_KEY = process.env.CRYPTO_STORAGE_KEY || "no-key";

/**
 * Encrypt and Decrypt sensitive data
 */
export const cryptoTools = {
    encrypt: (data: string) => {
        return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
    },
    decrypt: (data: string) => {
        return CryptoJS.AES.decrypt(data, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
    },
    compare: (savedData: string, providedData: string): boolean => {
        return (
            CryptoJS.AES.decrypt(savedData, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8) ===
            providedData
        );
    },
};

/**
 * Utilizes LocalStorage to store and retrieve sensitive data after encrypting them
 */
export const CryptoStorage = {
    setItem: (storageKey: string, obj: unknown, encrypt: boolean = false) => {
        try {
            if (!localStorage) return null;

            const jsonString = JSON.stringify(obj);
            localStorage.setItem(
                storageKey,
                encrypt ? cryptoTools.encrypt(jsonString) : jsonString,
            );
        } catch (error) {
            console.error(error);
        }
    },

    getItem: (storageKey: string, decrypt: boolean = false) => {
        try {
            if (!localStorage) return null;

            const storedData = localStorage.getItem(storageKey);
            if (storageKey && storedData)
                return JSON.parse(decrypt ? cryptoTools.decrypt(storedData) : storedData);

            return null;
        } catch (error) {
            console.error(error);
            return null;
        }
    },

    removeItem: (storageKey: string) => {
        try {
            if (!localStorage) return null;

            localStorage.removeItem(storageKey);
        } catch (error) {
            console.error(error);
        }
    },
};
