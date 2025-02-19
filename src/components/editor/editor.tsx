import { FC } from "react";
import { v4 as uuidv4 } from "uuid";

import { ColumnComponent } from "../column";
import { Row } from "../row";
import { Stage } from "../stage";
import { useAppContext } from "../context";
import { Sidebar } from "../sidebar";
import { Contents } from "../contents";
import { isContainerSelected } from "../utils";

export const Editor: FC = () => {
  const { state } = useAppContext();

  return (
  <div className="editor">
    <Stage id={uuidv4()}>
      {Object.values(state.rows).map((row) => {
        const { id, columnIds } = row;

        return (
          <Row key={id} id={id} selected={isContainerSelected(state.selectedContainer?.id, id)}>
            {columnIds.map((columnId) => {
              const { id, contentsId } = state.columns[columnId];

              return (
                <ColumnComponent key={id} id={id} selected={isContainerSelected(state.selectedContainer?.id, id)}>
                 <Contents component={state.contents[contentsId]} />
                </ColumnComponent>
              );
            })}
          </Row>
        );
      })}
    </Stage>
    <Sidebar />
  </div>
)};
