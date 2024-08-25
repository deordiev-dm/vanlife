import Footer from "./components/Footer";
import Header from "./components/Header";
import { Link } from "react-router-dom";
import image from "./images/homepage.png";
import Button from "./components/Button";

function Homepage() {
  return (
    <>
      <Header />
      <main
        className="flex flex-col justify-center text-balance bg-cover bg-center px-6 py-16 text-white"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="container mx-auto">
          <h1 className="mb-4 text-4xl font-extrabold">
            You got the travel plans, <br /> we got the travel vans.
          </h1>
          <p className="mb-14 font-medium">
            Add adventure to your life by joining the #vanlife movement. Rent
            the perfect van to make your perfect road trip.
          </p>
          <Link to="/vans">
            <Button>Find your van</Button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Homepage;
