"use client";
import { ReactNode } from "react";
import { QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60,
            gcTime: 1000 * 60 * 10,
            refetchOnWindowFocus: true,
            refetchOnMount: true
        },
        mutations: {
            retry: false,
        },
    },
});


interface ReactQueryProviderProps {
    children: ReactNode;
    dehydratedState?: unknown;
}

export function ReactQueryProvider({
    children,
    dehydratedState,
}: ReactQueryProviderProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={dehydratedState}>
                {children}
            </HydrationBoundary>
            {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
    );
}
