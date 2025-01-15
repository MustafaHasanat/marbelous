/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useInView } from "./useInView";
import { InfiniteData } from "@tanstack/react-query";
import { ListPaginatedResponse } from "backend";
import { Button } from "@nextui-org/react";

interface Props<DataType> {
    fetchNextPage: any;
    hasNextPage: boolean;
    data: InfiniteData<ListPaginatedResponse<DataType>, unknown> | undefined;
    type: "inViewed" | "buttoned";
}

export function useInfiniteScrollFetch<DataType>({
    fetchNextPage,
    hasNextPage,
    data,
    type = "inViewed",
}: Props<DataType>) {
    const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

    const { ref: listRef, inViewState } = useInView<{
        list: boolean;
    }>({
        initialValues: {
            list: false,
        },
    });

    const transformedData = useMemo(() => data?.pages?.flatMap((page) => page.data), [data]);

    const handleFetchNext = async () => {
        setIsFetchingNextPage(true);

        await fetchNextPage().then(() => {
            setIsFetchingNextPage(false);
        });
    };

    const ViewMoreButton = () =>
        hasNextPage && (
            <div className="mx-auto w-fit my-5">
                <Button
                    color="secondary"
                    variant="bordered"
                    className="mx-auto w-fit"
                    isLoading={isFetchingNextPage}
                    onPress={() => {
                        if (type === "buttoned" && hasNextPage && !isFetchingNextPage) {
                            handleFetchNext();
                        }
                    }}
                >
                    see more
                </Button>
            </div>
        );

    useEffect(() => {
        if (type === "inViewed" && inViewState?.list && hasNextPage && !isFetchingNextPage) {
            handleFetchNext();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type, inViewState?.list, hasNextPage, isFetchingNextPage]);

    return { listRef, isFetchingNextPage, inViewState, transformedData, ViewMoreButton };
}
