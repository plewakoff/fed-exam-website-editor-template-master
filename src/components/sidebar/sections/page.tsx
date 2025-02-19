import { FC } from "react";
import { useAppContext } from "../../context";
import { Section } from "./section";

export const PageSection: FC = () => {
  const { dispatch } = useAppContext();

  return (
    <Section.Group>
      <Section.Header text="Page" />
      <Section.Actions>
        <button className="action" onClick={() => dispatch({ type: "ADD_ROW" })}>
          Add row
        </button>
      </Section.Actions>
    </Section.Group>
  );
};
