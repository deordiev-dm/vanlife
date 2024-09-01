import { useOutletContext } from "react-router-dom";

export default function HostVanDetails() {
  const [VanInfo] = useOutletContext<any>();

  return (
    <>
      <p>
        <span className="font-semibold">Name:</span> {VanInfo.name}
      </p>
      <p className="capitalize">
        <span className="font-semibold">Category:</span> {VanInfo.type}
      </p>
      <p>
        <span className="font-semibold">Description:</span>{" "}
        {VanInfo.description}
      </p>
      <p>
        <span className="font-semibold">Visibility:</span> public
      </p>
    </>
  );
}
