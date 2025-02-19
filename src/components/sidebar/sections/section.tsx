import { FC, ReactNode } from "react";

export namespace Section {
  export const Group: FC<Readonly<{ children: Readonly<ReactNode[]> | Readonly<ReactNode> }>> = ({ children }) => (
    <div className="section">{children}</div>
  );

  export const Header: FC<Readonly<{ text: string }>> = ({ text }) => <div className="section-header">{text}</div>;

  export const Actions: FC<Readonly<{ children: Readonly<ReactNode[]> | Readonly<ReactNode> }>> = ({ children }) => (
    <div className="actions">{children}</div>
  );
}
