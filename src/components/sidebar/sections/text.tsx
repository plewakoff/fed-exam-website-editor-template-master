import React, { FC } from "react";
import classNames from "classnames";

import { ComponentType, useAppContext } from "../../context";
import { Icons } from "../../icons";
import { isColumn, isContainerHasComponent, isText } from "../../utils";

import { Section } from "./section";

export const TextSection: FC = () => {
  const {
    state: { selectedContainer, contents },
    dispatch,
  } = useAppContext();
  
  if (
      !selectedContainer
      || !isColumn(selectedContainer)
      || !isContainerHasComponent(selectedContainer, contents, ComponentType.Text)
  ) {
    return null;
  }

  const component = contents[selectedContainer.contentsId];

  if (!isText(component)) {
    return null;
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: "UPDATE_TEXT",
      payload: { contentsId: component.id, text: e.target.value },
    });
  };

  const handleTextAlignChange = (alignment: "left" | "center" | "right") => {
    dispatch({
      type: "UPDATE_TEXT_ALIGNMENT",
      payload: { contentsId: component.id, alignment },
    });
  };

  return (
    <Section.Group>
      <Section.Header text="Text" />
      <div className="button-group-field">
        <label>Alignment</label>
        <div className="button-group">
          <button
            className={classNames({ selected: component.alignment === "left" })}
            onClick={() => handleTextAlignChange("left")}
          >
            <Icons.TextAlignLeft />
          </button>
          <button
            className={classNames({ selected: component.alignment === "center" })}
            onClick={() => handleTextAlignChange("center")}
          >
            <Icons.TextAlignCenter />
          </button>
          <button
            className={classNames({ selected: component.alignment === "right" })}
            onClick={() => handleTextAlignChange("right")}
          >
            <Icons.TextAlignRight />
          </button>
        </div>
      </div>
      <div className="textarea-field">
        <textarea rows={8} placeholder="Enter text" value={component.text} onChange={handleTextChange} />
      </div>
    </Section.Group>
  );
};
