import { v4 as uuidv4 } from "uuid";
import { Action, AppState, Component, ComponentType, ContainerType, Image, Text } from "./types";
import { selectContainerById, isImage, isText, selectRowByColumnId } from "../utils";

export const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "ADD_ROW":
      return addRow(state);
    case "ADD_COLUMN":
      return addColumn(state);
    case "SELECT_CONTAINER":
      return {
        ...state,
        selectedContainer: selectContainerById(state, action.payload),
      };
    case "UPDATE_CONTENT_TYPE":
      return updateContentType(state, action.payload.columnId, action.payload.contentType);
    case "UPDATE_TEXT":
      return updateContentField(state, action.payload.contentsId, "text", action.payload.text, isText);
    case "UPDATE_TEXT_ALIGNMENT":
      return updateContentField(state, action.payload.contentsId, "alignment", action.payload.alignment, isText);
    case "UPDATE_IMG_URL":
      return updateContentField(state, action.payload.contentsId, "src", action.payload.url, isImage);
    default:
      return state;
  }
};

const addRow = (state: AppState): AppState => {
  const newRowId = uuidv4();

  return {
    ...state,
    rows: {
      ...state.rows,
      [newRowId]: {
        id: newRowId,
        type: ContainerType.Row,
        columnIds: [],
      },
    },
    selectedContainer: {
      id: newRowId,
      type: ContainerType.Row,
      columnIds: [],
    },
  };
};

const addColumn = (state: AppState): AppState => {
  if (!state.selectedContainer) return state;

  const newColumnId = uuidv4();
  const rowId = (() => {
    if (!state.selectedContainer) return undefined;

    if (state.selectedContainer.type === ContainerType.Row) {
      return state.selectedContainer.id;
    }

    if (state.selectedContainer.type === ContainerType.Column) {
      return selectRowByColumnId(state, state.selectedContainer.id);
    }

    return undefined;
  })();

  if (!rowId) return state;

  return {
    ...state,
    rows: {
      ...state.rows,
      [rowId]: {
        ...state.rows[rowId],
        columnIds: [...state.rows[rowId].columnIds, newColumnId],
      },
    },
    columns: {
      ...state.columns,
      [newColumnId]: {
        id: newColumnId,
        type: ContainerType.Column,
        contentsId: "",
      },
    },
    selectedContainer: {
      id: newColumnId,
      type: ContainerType.Column,
      contentsId: "",
    },
  };
};

const updateContentType = (state: AppState, columnId: string, contentType: ComponentType): AppState => {
  const column = state.columns[columnId];
  if (!column) return state;

  const contentsId = column.contentsId || uuidv4();

  return {
    ...state,
    columns: {
      ...state.columns,
      [columnId]: {
        ...column,
        contentsId,
      },
    },
    contents: {
      ...state.contents,
      [contentsId]: {
        id: contentsId,
        ...(contentType === ComponentType.Text
            ? { text: "", type: ComponentType.Text, alignment: "left" }
            : { src: "", type: ComponentType.Image }),
      },
    },
  };
};

const updateContentField = <T extends keyof Text | keyof Image,>(
    state: AppState,
    contentsId: string,
    field: T,
    value: T extends keyof Text ? Text[T] : T extends keyof Image ? Image[T] : never,
    validator: (content: Component) => content is Text | Image
): AppState => {
  const content = state.contents[contentsId];

  if (!content || !validator(content)) return state;

  return {
    ...state,
    contents: {
      ...state.contents,
      [contentsId]: {
        ...content,
        [field]: value,
      },
    },
  };
};
