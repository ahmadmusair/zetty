export const actionType = {
  STORE: "STORE_IDEA",
  STORE_MANY: "STORE_MANY_IDEA",
  LOADING: "LOADING_IDEA",
  ERROR: "ERROR_IDEA",
  STAR: "STAR_IDEA",
  UNSTAR: "UNSTAR_IDEA",
  UPDATE: "UPDATE_IDEA",
  UPDATE_MANY: "UPDATE_MANY",
};

export const storeIdea = (idea) => ({
  type: actionType.STORE,
  idea,
});

export const storeManyIdea = (ideas) => ({
  type: actionType.STORE_MANY,
  ideas,
});

export const loadingIdea = (isLoading) => ({
  type: actionType.LOADING,
  isLoading,
});

export const errorIdea = (message) => ({
  type: actionType.ERROR,
  message,
});

export const starIdea = (idea) => ({
  type: actionType.STAR,
  idea,
});

export const unstarIdea = (idea) => ({
  type: actionType.UNSTAR,
  idea,
});

export const updateIdea = (updated) => ({
  type: actionType.UPDATE,
  updated,
});

export const updateManyIdea = (ideas) => ({
  type: actionType.UPDATE_MANY,
  ideas,
});
