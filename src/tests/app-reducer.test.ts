import { appReducer } from "../components/context/app-reducer";
import { AppState, Action, ComponentType, ContainerType, Text, Image } from "../components/context";

jest.mock('uuid', () => ({ v4: () => 'unique-id' }));

const initialState: AppState = {
  rows: {},
  columns: {},
  contents: {},
  selectedContainer: undefined,
};

describe("appReducer", () => {
  it("should handle ADD_ROW", () => {
    const action: Action = { type: "ADD_ROW" };
    const newState = appReducer(initialState, action);

    expect(newState.rows["unique-id"]).toEqual({
      id: "unique-id",
      type: ContainerType.Row,
      columnIds: [],
    });
    expect(newState.selectedContainer).toEqual({
      id: "unique-id",
      type: ContainerType.Row,
      columnIds: [],
    });
  });

  it("should handle ADD_COLUMN", () => {
    const stateWithRow: AppState = {
      ...initialState,
      rows: {
        "row-id": {
          id: "row-id",
          type: ContainerType.Row,
          columnIds: [],
        },
      },
      selectedContainer: {
        id: "row-id",
        type: ContainerType.Row,
        columnIds: [],
      },
    };

    const action: Action = { type: "ADD_COLUMN" };
    const newState = appReducer(stateWithRow, action);

    expect(newState.rows["row-id"].columnIds).toContain("unique-id");
    expect(newState.columns["unique-id"]).toEqual({
      id: "unique-id",
      type: ContainerType.Column,
      contentsId: "",
    });
    expect(newState.selectedContainer).toEqual({
      id: "unique-id",
      type: ContainerType.Column,
      contentsId: "",
    });
  });

  it("should handle SELECT_CONTAINER", () => {
    const stateWithContainers: AppState = {
      ...initialState,
      rows: {
        "row-id": {
          id: "row-id",
          type: ContainerType.Row,
          columnIds: ["column-id"],
        },
      },
      columns: {
        "column-id": {
          id: "column-id",
          type: ContainerType.Column,
          contentsId: "",
        },
      },
    };

    const action: Action = { type: "SELECT_CONTAINER", payload: "column-id" };
    const newState = appReducer(stateWithContainers, action);

    expect(newState.selectedContainer).toEqual({
      id: "column-id",
      type: ContainerType.Column,
      contentsId: "",
    });
  });

  it("should handle UPDATE_CONTENT_TYPE", () => {
    const stateWithColumn: AppState = {
      ...initialState,
      columns: {
        "column-id": {
          id: "column-id",
          type: ContainerType.Column,
          contentsId: "",
        },
      },
    };

    const action: Action = {
      type: "UPDATE_CONTENT_TYPE",
      payload: { columnId: "column-id", contentType: ComponentType.Text },
    };
    const newState = appReducer(stateWithColumn, action);

    expect(newState.columns["column-id"].contentsId).toBe("unique-id");
    expect(newState.contents["unique-id"]).toEqual({
      id: "unique-id",
      text: "",
      type: ComponentType.Text,
      alignment: "left",
    });
  });

  it("should handle UPDATE_TEXT", () => {
    const stateWithText: AppState = {
      ...initialState,
      contents: {
        "content-id": {
          id: "content-id",
          type: ComponentType.Text,
          text: "old text",
          alignment: "left",
        } as Text,
      },
    };

    const action: Action = {
      type: "UPDATE_TEXT",
      payload: { contentsId: "content-id", text: "new text" },
    };
    const newState = appReducer(stateWithText, action);

    const content = newState.contents["content-id"];
    if (content.type === ComponentType.Text) {
      expect(content.text).toBe("new text");
    }
  });

  it("should handle UPDATE_TEXT_ALIGNMENT", () => {
    const stateWithText: AppState = {
      ...initialState,
      contents: {
        "content-id": {
          id: "content-id",
          type: ComponentType.Text,
          text: "some text",
          alignment: "left",
        } as Text,
      },
    };

    const action: Action = {
      type: "UPDATE_TEXT_ALIGNMENT",
      payload: { contentsId: "content-id", alignment: "center" },
    };
    const newState = appReducer(stateWithText, action);

    const content = newState.contents["content-id"];
    if (content.type === ComponentType.Text) {
      expect(content.alignment).toBe("center");
    }
  });

  it("should handle UPDATE_IMG_URL", () => {
    const stateWithImage: AppState = {
      ...initialState,
      contents: {
        "content-id": {
          id: "content-id",
          type: ComponentType.Image,
          src: "old-url",
        } as Image,
      },
    };

    const action: Action = {
      type: "UPDATE_IMG_URL",
      payload: { contentsId: "content-id", url: "new-url" },
    };
    const newState = appReducer(stateWithImage, action);

    const content = newState.contents["content-id"];
    if (content.type === ComponentType.Image) {
      expect(content.src).toBe("new-url");
    }
  });
});
