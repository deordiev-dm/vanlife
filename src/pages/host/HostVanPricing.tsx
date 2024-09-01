import { useOutletContext } from "react-router-dom";

export default function HostVanPricing() {
  const [VanInfo] = useOutletContext<any>();

  return (
    <>
      <p>
        <span className="text-lg font-semibold">${VanInfo.price}</span>/day
      </p>
    </>
  );
}
