import { FC } from "react";
import { ImagePlaceholder } from "../image-placeholder";

export interface ImageProps {
  id: string;
  src: string;
  alt: string;
}

export const Image: FC<ImageProps> = (props) => {
  return props.src.length > 0
      ? <img id={props.id} src={props.src} alt={props.alt} />
      : <ImagePlaceholder />;
};
