import { LoadingSpinner } from "@/components";
import dynamic from "next/dynamic";

const NotFoundPage = dynamic(() => import("@/components/shared/NotFoundPage"), {
    loading: () => <LoadingSpinner />,
});

export default function Layout() {
    return <NotFoundPage />;
}
