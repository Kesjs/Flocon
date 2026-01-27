"use client";

import { usePageLoader } from "@/hooks/usePageLoader";
import PageLoader from "@/components/PageLoader";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const { isLoading } = usePageLoader();

  return (
    <>
      {children}
      <PageLoader isLoading={isLoading} />
    </>
  );
}
