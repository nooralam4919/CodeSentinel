import { createContext } from "react";

const userContext = createContext({
  currentUser: "",
  setCurrentUser: (value: string) => {},
});

export default userContext;