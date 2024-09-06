import Button from "../components/utility/Button";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center gap-y-5 px-6 pb-12 pt-6">
      <h1 className="text-3xl font-bold">
        Sorry, the page you were looking for was not found.
      </h1>
      <Button as="a" to="/" colors="black">
        Return to Home
      </Button>
    </main>
  );
}
