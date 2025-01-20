/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Pagination } from "@heroui/react";
import React, { useMemo, useState } from "react";
import { UseQueryResult } from "@tanstack/react-query";

interface Props<FnParamsType, FnReturnType> {
    useGetterFn: (params: FnParamsType) => UseQueryResult<FnReturnType, Error>;
    params: any;
    pageSize: number;
}

type ReturnProps<FnReturnType> = {
    Pagination: () => React.JSX.Element;
    currentPage: number;
    total: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    data?: FnReturnType;
} & Omit<UseQueryResult<FnReturnType, Error>, "data">;

export function usePaginatedData<FnParamsType, FnReturnType>({
    params,
    useGetterFn,
    pageSize,
}: Props<FnParamsType, FnReturnType>): ReturnProps<FnReturnType> {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, ...rest } = useGetterFn({ ...params, page: currentPage });

    const handleChange = (page: number) => {
        setCurrentPage(page);
    };

    const total = useMemo(() => {
        if (!(data as any)?.data?.length) return 0;
        return Math.ceil((data as any)?.count / params?.page_size);
    }, [data, params?.page_size]);

    const PaginationComponent = () =>
        (data as any) && (data as any)?.data?.length !== 0 && (data as any)?.count > pageSize ? (
            <div className="w-full m-auto p-3 flex justify-center items-center">
                <Pagination
                    total={total}
                    page={currentPage}
                    onChange={handleChange}
                    size="lg"
                    siblings={1}
                />
            </div>
        ) : (
            <></>
        );

    return {
        Pagination: PaginationComponent,
        currentPage,
        setCurrentPage,
        total,
        data,
        ...(rest as Omit<UseQueryResult<FnReturnType, Error>, "data">),
    };
}
