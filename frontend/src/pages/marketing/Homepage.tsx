import Button from "@/components/utils/Button";
import bg from "@/assets/img/homepage.jpg";

function Homepage() {
  return (
    <main
      className="flex flex-col justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="container space-y-8 py-16 text-white">
        <h1 className="mb-12 text-balance text-3xl font-extrabold tracking-tight md:text-4xl 2xl:text-5xl">
          You got the travel plans, we got the travel vans.
        </h1>
        <p className="md:text-xl 2xl:text-2xl">
          Add adventure to your life by joining the #vanlife movement. Rent the
          perfect van to make your perfect road trip.
        </p>
        <Button as="a" to="/vans" colors="orange">
          Find your van
        </Button>
      </div>
    </main>
  );
}

export default Homepage;
