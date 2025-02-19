import classNames from "classnames";
import { FC } from "react";
import { SelectableContainer } from "../selectable-container";

export interface StageProps {
  id: string;
  children?: React.ReactNode;
  selected?: boolean;
  onSelect?(): void;
}

export const Stage: FC<StageProps> = ({ selected, ...props }) => (
  <SelectableContainer className={classNames("stage", { selected })} {...props} />
);
