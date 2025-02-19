import {
  AppState,
  Column,
  Component,
  ComponentType,
  Container,
  ContainerType,
  Image, Row,
  Text
} from "../context";

export const selectContainerById = (state: AppState, id: string): Container | undefined => {
  for (const row of Object.values(state.rows)) {
    if (row.id === id) return row;
  }
  for (const column of Object.values(state.columns)) {
    if (column.id === id) return column;
  }
  return undefined;
};

export const selectRowByColumnId = (state: AppState, columnId: string): string | undefined => {
  return Object.values(state.rows).find((row) => row.columnIds.includes(columnId))?.id;
};

export const isColumn = (container: Container | undefined): container is Column => {
  return container?.type === ContainerType.Column;
};

export const isRow = (container: Container | undefined): container is Row => {
  return container?.type === ContainerType.Row;
};

export const isText = (component: Component | undefined): component is Text => {
  return component?.type === ComponentType.Text;
};

export const isImage = (component: Component | undefined): component is Image => {
  return component?.type === ComponentType.Image;
};

export const isContainerHasComponent = (container: Container, contents: Record<string, Component>, componentType: ComponentType): boolean => {
    return container.type === ContainerType.Column && contents[container.contentsId]?.type === componentType;
};

export const isContainerSelected = (selectedContainerId: string | undefined, id: string): boolean => {
  return selectedContainerId === id;
};
