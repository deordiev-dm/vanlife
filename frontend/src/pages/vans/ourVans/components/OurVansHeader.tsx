import VanFilter from "./VanFilter";

function OurVansHeader() {
  return (
    <div className="space-y-6">
      <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
        Explore out van options
      </h1>
      <VanFilter />
    </div>
  );
}

export default OurVansHeader;
