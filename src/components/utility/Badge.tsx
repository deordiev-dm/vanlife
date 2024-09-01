type BadgeProps = {
  type: "simple" | "luxury" | "rugged";
};

function Badge({ type }: BadgeProps) {
  let backgroundColor;

  switch (type) {
    case "simple":
      backgroundColor = "#E17654";
      break;
    case "luxury":
      backgroundColor = "#161616";
      break;
    case "rugged":
      backgroundColor = "#115E59";
      break;
  }

  const styles = {
    backgroundColor,
  };

  return (
    <div
      style={styles}
      className="inline-block min-h-6 rounded-lg px-4 py-1 text-center font-semibold capitalize text-[#FFEAD0]"
    >
      {type}
    </div>
  );
}

export default Badge;
