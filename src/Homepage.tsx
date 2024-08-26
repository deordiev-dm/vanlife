import image from "./images/homepage.jpg";
import Button from "./components/Button";

function Homepage() {
  return (
    <main
      className="flex flex-col justify-center text-balance bg-cover bg-center px-6 py-16 text-white sm:items-center"
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="sm:w-2/3">
        <h1 className="mb-4 text-3xl font-extrabold">
          You got the travel plans, we got the travel vans.
        </h1>
        <p className="mb-14 font-medium">
          Add adventure to your life by joining the #vanlife movement. Rent the
          perfect van to make your perfect road trip.
        </p>
        <Button to="/vans" colors="orange">
          Find your van
        </Button>
      </div>
    </main>
  );
}

export default Homepage;
