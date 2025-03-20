import React, { Suspense } from "react";
import Home from "@/components/Home";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-96">
          <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <Home />
    </Suspense>
  );
}
