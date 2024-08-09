import { useContext } from "react";
import { GlobalDispatchContext } from "../context/GlobalContext";

export const useDispatch = () => useContext(GlobalDispatchContext);
