export default function Marquee() {
  // const marqueeText =
  //   "OPEN TO ALL · LEARN TOGETHER · BUILD SKILLS · NEPAL · COMPUTING · COMMUNITY · ";
  const marqueeTextList = [
    "OPEN TO ALL",
    "LEARN TOGETHER",
    "BUILD SKILLS",
    "NEPAL COMPUTING COMMUNITY",
  ];

  const whitespace = 10;
  const marqueeText = `${marqueeTextList.join(
    `${" ".repeat(whitespace)}·${" ".repeat(whitespace)}`,
  )}${" ".repeat(whitespace)}·${" ".repeat(whitespace)}`;

  return (
    <section
      id="marquee-section"
      className="w-full bg-primary py-5 overflow-hidden select-none border-y border-primary/20"
    >
      <div className="relative w-full flex items-center overflow-x-hidden">
        {/* Scrolling text wrapper */}
        <div className="animate-marquee whitespace-pre flex items-center gap-4">
          <span className="text-white font-bold tracking-widest text-sm md:text-lg lg:text-xl uppercase font-sans py-1">
            {marqueeText}
            {marqueeText}
            {marqueeText}
            {marqueeText}
          </span>
          <span className="text-white font-bold tracking-widest text-sm md:text-lg lg:text-xl uppercase font-sans py-1">
            {marqueeText}
            {marqueeText}
            {marqueeText}
            {marqueeText}
          </span>
        </div>
      </div>
    </section>
  );
}
