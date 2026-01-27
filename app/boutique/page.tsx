"use client";

import { Suspense } from "react";
import BoutiqueContent from "./BoutiqueContent";

export default function BoutiquePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BoutiqueContent />
    </Suspense>
  );
}
