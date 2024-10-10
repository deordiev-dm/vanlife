import image from "../images/homepage.jpg";
import Button from "../components/utils/Button";

function Homepage() {
  return (
    <main
      className="flex flex-col justify-center bg-cover bg-center px-6 py-16 text-white"
      style={{ backgroundImage: `url(${image})` }}
    >
      <h1 className="mb-4 text-balance text-3xl font-extrabold">
        You got the travel plans, we got the travel vans.
      </h1>
      <p className="mb-14 font-medium">
        Add adventure to your life by joining the #vanlife movement. Rent the
        perfect van to make your perfect road trip.
      </p>
      <Button as="a" to="/vans" colors="orange">
        Find your van
      </Button>
    </main>
  );
}

export default Homepage;
