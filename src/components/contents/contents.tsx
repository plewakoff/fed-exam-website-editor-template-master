import { FC } from "react";
import { Component, ComponentType } from "../context";
import { Markdown } from "../markdown";
import { Image } from "../image";

export interface ContentsProps {
  component: Component | undefined;
}

export const Contents: FC<ContentsProps> = ({ component }) => {
  if (!component) {
    return null;
  }

  switch (component.type) {
    case ComponentType.Text:
      return (
        <Markdown id={component.id} className={`text-align-${component.alignment}`}>
          {component.text ?? ""}
        </Markdown>
      );
    case ComponentType.Image:
      return <Image id={component.id} src={component.src ?? ""} alt="" />;
    default:
      return null;
  }
};
