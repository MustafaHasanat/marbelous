import { ItemResponse, ListResponse, ListPaginatedResponse } from "backend";

export function getItemResponseErrorObj<T>({ error }: { error?: string }) {
    return { data: null, status: false, error } as ItemResponse<T>;
}

export function getListResponseErrorObj<T>({ error }: { error?: string }) {
    return { data: [], status: false, error } as ListResponse<T>;
}

export function getPaginatedResponseErrorObj<T>({ error }: { error?: string }) {
    return {
        data: [],
        status: false,
        error,
        count: 0,
        next: null,
        previous: null,
    } as ListPaginatedResponse<T>;
}
