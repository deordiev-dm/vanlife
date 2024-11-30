import Button from "./Button";

export function BecomeAHost({ path }) {
  return (
    <div className="space-y-4 pb-6 pt-12 sm:space-y-8">
      <h2 className="text-balance text-center text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
        Host your first van to start earning money today!
      </h2>
      <Button as="a" to={path}>
        Get started!
      </Button>
    </div>
  );
}
