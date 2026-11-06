import { SplitText } from "@/components/SplitText";

const LINES = ["Lyra Astra", "Photographer", "Instagram", "©2026", "Website by @Sbas"];

export function Header() {
  // One cascade across the header: each line starts where the previous one ended.
  const [name, role, instagram, year, credit] = LINES.map((text, i) => (
    <SplitText key={text} text={text} start={LINES.slice(0, i).join("").length} />
  ));

  return (
    <header className="flex flex-col gap-4 py-[18px] lg:grid lg:grid-cols-16 xl:grid-cols-24">
      <div className="lg:col-span-4">
        {name}
        {role}
      </div>
      <div className="lg:col-span-4">
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-fit underline"
        >
          {instagram}
        </a>
      </div>
      <div className="lg:col-span-4">
        {year}
        <a href="#" className="block w-fit underline">
          {credit}
        </a>
      </div>
    </header>
  );
}
