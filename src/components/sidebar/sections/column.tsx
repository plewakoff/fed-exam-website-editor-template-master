import { FC } from "react";
import classNames from "classnames";

import { ComponentType, useAppContext } from "../../context";
import { Icons } from "../../icons";
import { isColumn, isImage, isText } from "../../utils";

import { Section } from "./section";

export const ColumnSection: FC = () => {
  const {
    state: { selectedContainer, contents },
    dispatch,
  } = useAppContext();

  if (!selectedContainer || !isColumn(selectedContainer)) {
    return null;
  }

  const handleContentTypeChange = (contentType: ComponentType) => {
    if (isColumn(selectedContainer)) {
      dispatch({
        type: "UPDATE_CONTENT_TYPE",
        payload: { columnId: selectedContainer.id, contentType },
      });
      dispatch({ type: "SELECT_CONTAINER", payload: selectedContainer.id });
    }
  };

  return (
    <Section.Group>
      <Section.Header text="Column" />
      <Section.Actions>
        <div className="button-group-field">
          <label>Contents</label>
          <div className="button-group">
            <button
              className={classNames({ selected: isText(contents[selectedContainer.contentsId])})}
              onClick={() => handleContentTypeChange(ComponentType.Text)}
            >
              <Icons.Text />
            </button>
            <button
              className={classNames({ selected: isImage(contents[selectedContainer.contentsId])})}
              onClick={() => handleContentTypeChange(ComponentType.Image)}
            >
              <Icons.Image />
            </button>
          </div>
        </div>
      </Section.Actions>
    </Section.Group>
  );
};
