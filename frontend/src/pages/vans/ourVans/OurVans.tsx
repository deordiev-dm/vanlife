import { useState } from "react";
import OurVansHeader from "./components/OurVansHeader";
import VanGrid from "./components/VanGrid";
import Pagination from "@/components/ui/Pagination";

export default function OurVans() {
  const [totalPages, setTotalPages] = useState(1);

  return (
    <main className="container flex flex-col space-y-6 pb-12 pt-28 sm:space-y-8 md:space-y-10">
      <OurVansHeader />
      <div className="flex-grow">
        <VanGrid setTotalPages={setTotalPages} />
      </div>
      <Pagination totalPages={totalPages} />
    </main>
  );
}
