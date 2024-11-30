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
      className="inline-block rounded-2xl px-3 py-2 text-center text-lg font-semibold capitalize text-white"
    >
      {type}
    </div>
  );
}

export default Badge;
