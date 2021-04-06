import React from "react";

import ideaReducer from "./idea.reducer";

export const initialState = {
  idea: undefined,
};

export const initialAction = {
  type: undefined,
};

export const mainReducer = (state = initialState, action = initialAction) => ({
  idea: ideaReducer(state.idea, action),
});

export const StoreCtx = React.createContext(null);

export const useStore = () => React.useContext(StoreCtx);
