import { useOutletContext } from "react-router-dom";

export default function HostVanPhotos() {
  const [vanInfo] = useOutletContext<any>();
  return (
    <>
      <img src={vanInfo.imageUrl} className="w-[6.25rem] rounded-md" alt="" />
    </>
  );
}
