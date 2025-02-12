import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react";
import type { PropsWithChildren } from "react";

const queryClient = new QueryClient();

/**
 * Provides global context and services to the application.
 *
 * This component wraps its children with:
 * - `QueryClientProvider`: Provides a React Query client for caching and data fetching.
 * - `NuqsAdapter`: Adapts query parameters to the application state.
 *
 * @component
 * @param {Readonly<PropsWithChildren>} props - The component's props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the providers.
 * @returns {JSX.Element} The wrapped component with global providers.
 */
export default function Providers({
  children,
}: Readonly<PropsWithChildren>): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>{children}</NuqsAdapter>
    </QueryClientProvider>
  );
}
