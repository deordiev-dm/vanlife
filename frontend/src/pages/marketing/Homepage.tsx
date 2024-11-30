import Button from "@/components/ui/Button";
import bg from "@/assets/img/homepage.webp";

function Homepage() {
  return (
    <main
      className="flex flex-col justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})`, backgroundColor: "#171717" }}
    >
      <div className="container max-w-3xl space-y-8 pb-16 pt-36 text-white">
        <h1 className="mb-12 text-balance text-4xl font-extrabold tracking-tight md:text-5xl 2xl:text-6xl">
          You got the travel plans, we got the travel vans.
        </h1>
        <div className="max-w-3xl space-y-12 md:text-xl">
          <p className="font-semibold md:text-2xl 2xl:text-2xl">
            Add adventure to your life by joining the #vanlife movement. Rent
            the perfect van to make your perfect road trip.
          </p>
          <div className="space-y-2">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
              totam.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam
              dicta incidunt odio soluta consectetur, maxime aliquid dignissimos
              cupiditate ut ea?
            </p>
          </div>
          <Button as="a" to="/vans">
            Find your van
          </Button>
        </div>
      </div>
    </main>
  );
}

export default Homepage;
