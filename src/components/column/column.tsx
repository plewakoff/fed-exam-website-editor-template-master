import classNames from "classnames";
import { FC } from "react";
import { SelectableContainer } from "../selectable-container";

export interface ColumnProps {
  id: string;
  children?: React.ReactNode;
  selected?: boolean;
  onSelect?(): void;
}

export const ColumnComponent: FC<ColumnProps> = ({ selected, ...props }) => (
  <SelectableContainer className={classNames("column", { selected })} {...props} />
);
