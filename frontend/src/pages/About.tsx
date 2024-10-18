import Button from "../components/utils/Button";

import aboutBgImage from "../images/aboutBgImage.jpg";

function About() {
  return (
    <main className="space-y-12 pb-12">
      <div className="aspect-video max-h-56 w-full">
        <img
          src={aboutBgImage}
          className="h-full w-full object-cover object-bottom"
          alt="white van under blue sky"
        />
      </div>
      <section className="px-6">
        <h1 className="mb-7 text-[2rem] font-bold leading-[1.2]">
          Don't squeezee in a sedan when you could relax in van.
        </h1>
        <div className="space-y-4">
          <p className="font-medium">
            Our mission is to enliven your road trip with the perfect travel van
            rental. Our vans are recertified before each trip to ensure your
            travel plans can go off without a hitch. (Hitch costs extra 😉)
          </p>
          <p className="font-medium">
            Our team is full of vanlife enthusiasts who know firsthand the magic
            of touring the world on 4 wheels.
          </p>
        </div>
      </section>
      <section className="px-6">
        <div className="space-y-4 rounded-md bg-[#FFCC8D] p-8">
          <h2 className="text-2xl font-bold">
            Your destination is waiting. <br />
            Your van is ready.
          </h2>
          <Button as="a" to="/vans" colors="black">
            Expore out vans
          </Button>
        </div>
      </section>
    </main>
  );
}

export default About;
