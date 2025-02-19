export interface AppState {
  rows: Record<string, Row>;
  columns: Record<string, Column>;
  contents: Record<string, Component>;
  selectedContainer: Container | undefined;
}

export interface ComponentBase {
  readonly id: string;
  readonly type: ComponentType | ContainerType;
}

export enum ContainerType {
  Row,
  Column,
}

export enum ComponentType {
  Text,
  Image,
}

export type Component = Text | Image;
export type Container = Row | Column;

export type Row = ComponentBase & {
  type: ContainerType.Row;
  columnIds: string[];
};

export type Column = ComponentBase & {
  type: ContainerType.Column;
  contentsId: string;
};

export type Text = ComponentBase & {
  type: ComponentType.Text;
  text?: string;
  alignment?: "left" | "center" | "right";
};

export type Image = ComponentBase & {
  type: ComponentType.Image;
  src?: string;
};

export type Action =
  | { type: "ADD_ROW" }
  | { type: "ADD_COLUMN" }
  | { type: "SELECT_CONTAINER"; payload: string }
  | { type: "UPDATE_CONTENT_TYPE"; payload: { columnId: string; contentType: ComponentType } }
  | { type: "UPDATE_TEXT"; payload: { text: string; contentsId: string } }
  | { type: "UPDATE_TEXT_ALIGNMENT"; payload: { alignment: "left" | "center" | "right"; contentsId: string } }
  | { type: "UPDATE_IMG_URL"; payload: { url: string; contentsId: string } };
