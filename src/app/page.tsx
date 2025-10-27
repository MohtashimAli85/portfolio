import EchoResonance from "@/components/echoe-resonance";
import Shadow from "../components/ui/Shadow";
import Typing from "../components/ui/Typing";

export default function Home() {
  return (
    <section className="flex h-full items-center px-5 py-20 lg:ml-[300px] lg:mr-[10%] xl:max-w-[65%] xl:px-0  md:py-24 ">
      <div className="flex flex-wrap xl:flex-nowrap gap-4 size-full  ">
        <div className="relative max-h-[510px] self-center -z-0 flex w-full flex-col justify-between xl:basis-1/2 md:space-y-20">
          <Shadow color="primary" top={0} left={-15} className=" md:hidden" />
          <Shadow
            color="secondary"
            top={150}
            right={-15}
            className="md:hidden"
          />
          <div className="space-y-3">
            <p className="text-base md:text-xl">Hi all, I am</p>
            <h1 className="text-3xl sm:text-4xl leading-tight md:text-5xl lg:text-6xl">
              Mohtashim Ali
            </h1>
            <h2 className="text-xl text-aquamarine sm:text-2xl md:text-3xl md:text-secondary">
              {">  "}
              <Typing text="Frontend Developer" />
            </h2>
          </div>
          <div className="space-y-4 text-xs sm:text-sm md:text-base">
            <p className="break-words text-secondary-dark">
              {"//"} you can also check it on my GitHub page
            </p>
            <h3 className="break-all font-medium text-salmon ">
              <span className="text-secondary">const </span>
              <span className="text-aquamarine"> githubLink </span>
              <span className="text-white">= </span>
              <span className="text-salmon ">
                <a
                  href="https://github.com/MohtashimAli85/portfolio"
                  target="_blank"
                  className="leading-normal"
                >
                  &quot;https://github.com/MohtashimAli85/portfolio&quot;
                </a>
              </span>
            </h3>
          </div>
        </div>
        <div className="hidden xl:basis-1/2 xl:block self-center">
          <EchoResonance />
        </div>
      </div>
    </section>
  );
}
