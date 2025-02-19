import { FC } from "react";
import { useAppContext } from "../context";
import { PageSection, RowSection, ColumnSection, TextSection, ImageSection } from "./sections";

export const Sidebar: FC = () => {
  const {
    state: { selectedContainer },
  } = useAppContext();

  if (!selectedContainer) {
    return (
      <div className="properties">
        <PageSection />
      </div>
    );
  }

  return (
    <div className="properties">
      <PageSection />
      <RowSection />
      <ColumnSection />
      <TextSection />
      <ImageSection />
    </div>
  );
};
