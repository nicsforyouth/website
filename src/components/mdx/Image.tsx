import NextImage, { ImageProps } from "next/image";

type Props = ImageProps & {
  caption?: string;
};

export function Image({ caption, ...props }: Props) {
  return (
    <figure className="my-10">
      <NextImage {...props} className={`rounded-xl ${props.className ?? ""}`} />

      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
