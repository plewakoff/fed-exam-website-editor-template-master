import { FC } from "react";
import { useAppContext } from "../../context";
import { isColumn, isRow } from "../../utils";
import { Section } from "./section";

export const RowSection: FC = () => {
  const {
    state: { selectedContainer },
    dispatch,
  } = useAppContext();

  if (!selectedContainer) {
    return null;
  }

  if (!isRow(selectedContainer) && !isColumn(selectedContainer)) {
      return null;
  }

  return (
    <Section.Group>
      <Section.Header text="Row" />
      <Section.Actions>
        <button className="action" onClick={() => dispatch({ type: "ADD_COLUMN" })}>
          Add column
        </button>
      </Section.Actions>
    </Section.Group>
  );
};
