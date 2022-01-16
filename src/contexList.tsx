import * as React from "react";
import { ContextReplacementPlugin } from "webpack";
import { MemberEntity } from "./entityModel";
interface Context {
  input: string;
  list: MemberEntity[];
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setList: React.Dispatch<React.SetStateAction<MemberEntity[]>>;
}
const ListContext = React.createContext<Context>({
  input: "ListContext must be used within a ListProvider",
  list: [],
  setInput: () => {},
  setList: () => {},
});

const ListProvider: React.FC = ({ children }) => {
  const [input, setInput] = React.useState("lemoncode");
  const [list, setList] = React.useState<MemberEntity[]>([]);
  return (
    <ListContext.Provider value={{ input, setInput, list, setList }}>
      {children}
    </ListContext.Provider>
  );
};

const useListContext = (): Context => {
  const context = React.useContext(ListContext);
  if (!context)
    throw new Error(
      "useListContext must be used within a ListProvider component"
    );
  return context;
};

export { useListContext, ListProvider };
