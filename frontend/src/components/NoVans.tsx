import Button from "./utils/Button";

function NoVans() {
  return (
    <div className="flex h-full flex-col space-y-5 pt-12 text-center">
      <h1 className="text-3xl font-bold">You don't host any vans yet.</h1>
      <Button as="a" to="/" colors="orange">
        Add a van
      </Button>
    </div>
  );
}

export default NoVans;
