import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

import { Van } from "./Vans";
import Badge from "../../components/utility/Badge";
import Button from "../../components/utility/Button";

function VanInfopage() {
  const params = useParams();
  const [vanInfo, setVanInfo] = useState<Van>();

  useEffect(() => {
    async function getData() {
      const res = await fetch(`/api/vans/${params.id}`);
      const data = await res.json();

      setVanInfo(data.vans);
    }

    getData();
  }, []);

  if (!vanInfo) return;

  return (
    <main className="space-y-8 px-6 pb-12 pt-6">
      <Link to=".." relative="path" className="flex items-center gap-x-3">
        <GoArrowLeft className="w-5 fill-[#858585]" />
        <span className="font-medium underline">Back to all vans</span>
      </Link>
      <div className="aspect-square overflow-hidden rounded-md">
        <img src={vanInfo?.imageUrl} alt="" />
      </div>
      <div className="space-y-5">
        <Badge type={vanInfo.type} />
        <h1 className="text-3xl font-bold">{vanInfo.name}</h1>
        <p className="text-xl font-medium">
          <span className="text-2xl">${vanInfo.price}/</span>day
        </p>
        <p className="font-medium">{vanInfo.description}</p>
        <Button colors="orange">Rent this van</Button>
      </div>
    </main>
  );
}

export default VanInfopage;
