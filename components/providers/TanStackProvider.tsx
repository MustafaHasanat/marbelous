import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const TanStackProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                staleTime: 24 * 60 * 60 * 1000,
                retry: 3,
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools
                initialIsOpen={false}
                position="right"
                buttonPosition="bottom-right"
            />
        </QueryClientProvider>
    );
};

export default TanStackProvider;
