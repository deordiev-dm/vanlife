import Button from "@/components/ui/Button";
import img from "@/assets/img/about.jpg";

function About() {
  return (
    <main
      className="bg-cover bg-bottom"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="container flex max-w-3xl flex-col space-y-16 pb-12 pt-36 md:pb-16">
        <section className="text-white">
          <h1 className="mb-16 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Don't squeezee in a sedan when you could relax in van.
          </h1>
          <div className="space-y-8 text-lg md:text-xl">
            <p>
              Our mission is to enliven your road trip with the perfect travel
              van rental. Our vans are recertified before each trip to ensure
              your travel plans can go off without a hitch. (Hitch costs extra
              😉)
            </p>
            <p>
              Our team is full of vanlife enthusiasts who know firsthand the
              magic of touring the world on 4 wheels.
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Asperiores hic ea impedit, deleniti officia quas ad ipsa autem.
              Fuga soluta temporibus sint provident, ducimus aliquam. In
              distinctio exercitationem animi repudiandae?
            </p>
          </div>
        </section>
        <section className="w-full space-y-8 rounded-md bg-orange-100 p-6">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            Your destination is waiting. <br />
            Your van is ready.
          </h2>
          <Button as="a" to="/vans">
            Explore our vans
          </Button>
        </section>
      </div>
    </main>
  );
}

export default About;
