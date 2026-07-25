import Image from "next/image";

type Props = {
  src: string;
  alt: string;
};

export function ArticleCover({ src, alt }: Props) {
  return (
    <div className="mx-auto mt-12 mb-16 max-w-4xl overflow-hidden rounded-2xl border">
      <Image
        unoptimized
        src={src}
        alt={alt}
        width={1600}
        height={900}
        // priority
        className="aspect-video w-full object-cover"
      />
    </div>
  );
}
