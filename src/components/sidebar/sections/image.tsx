import { FC } from "react";

import { ComponentType, useAppContext } from "../../context";
import { isColumn, isContainerHasComponent, isImage } from "../../utils";

import { Section } from "./section";

export const ImageSection: FC = () => {
  const {
    state: { selectedContainer, contents },
    dispatch,
  } = useAppContext();
  
  if (
      !selectedContainer 
      || !isColumn(selectedContainer)
      || !isContainerHasComponent(selectedContainer, contents, ComponentType.Image)
  ) {
    return null;
  }

  const component = contents[selectedContainer.contentsId];

  if (!isImage(component)) {
    return null;
  }

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_IMG_URL",
      payload: { contentsId: contents[selectedContainer.contentsId].id, url: e.target.value },
    });
  };

  return (
    <Section.Group>
      <Section.Header text="Image" />
      <div className="text-field">
        <label htmlFor="image-url">URL</label>
        <input id="image-url" type="text" value={component.src} onChange={handleImageUrlChange} />
      </div>
    </Section.Group>
  );
};
