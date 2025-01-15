declare module "backend" {
    type TGeneric<T> = T | null;

    type ListResponse<T> = {
        data: T[];
        status: TGeneric<boolean>;
        error?: TGeneric<string>;
    };

    type ListPaginatedResponse<T> = {
        count: number;
        next: TGeneric<number>;
        previous: TGeneric<number>;
        status: TGeneric<boolean>;
        error?: TGeneric<string>;
        data?: T[];
    };

    type ItemResponse<T> = {
        data: TGeneric<T>;
        status: TGeneric<boolean>;
        error?: TGeneric<string>;
        detail?: TGeneric<string>;
        code?: TGeneric<string>;
    };

    type PaginationParams = {
        page_size?: number;
        page?: number;
        enabled?: boolean;
    };

    type AxiosContentType =
        | "multipart/form-data"
        | "application/json"
        | "application/octet-stream"
        | "application/x-www-form-urlencoded"
        | "application/pdf"
        | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    type AxiosAcceptType = "application/pdf";

    type AxiosResponseType = "blob";
}
