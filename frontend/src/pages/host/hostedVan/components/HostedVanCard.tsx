import Badge from "@/components/ui/Badge";
import { Van } from "@/lib/types/types";

export default function HostedVanCard({ van }: { van: Van }) {
  return (
    <div className="grid gap-y-8 md:grid-cols-2 md:gap-x-16">
      <div className="overflow-hidden rounded-md">
        <img className="w-full" src={van.imageUrl} alt="" />
      </div>
      <div className="space-y-6 md:pt-4">
        <h1 className="text-3xl font-bold lg:text-4xl">{van.name}</h1>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="font-medium">
            <span className="text-2xl font-bold">${van.price}</span>
            /day
          </div>
          <Badge type={van.type} />
        </div>
        <p className="text-lg">{van.description}</p>
      </div>
    </div>
  );
}
