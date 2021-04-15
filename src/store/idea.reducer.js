import { actionType } from "./idea.actions";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  message: "",
};

const ideaReducer = (idea = initialState, action) => {
  switch (action.type) {
    case actionType.STORE:
      return {
        ...idea,
        data: [...idea.data, action.idea],
      };

    case actionType.STORE_MANY:
      return {
        ...idea,
        data: [...idea.data, ...action.ideas],
      };

    case actionType.STAR:
      return {
        ...idea,
        data: [
          ...idea.data.map((idea) =>
            idea.id === action.idea.id
              ? { ...action.idea, isStarred: true }
              : idea
          ),
        ],
      };

    case actionType.UNSTAR:
      return {
        ...idea,
        data: [
          ...idea.data.map((idea) =>
            idea.id === action.idea.id
              ? { ...action.idea, isStarred: false }
              : idea
          ),
        ],
      };

    case actionType.UPDATE:
      return {
        ...idea,
        data: [
          ...idea.data.map((idea) =>
            idea.id === action.updated.id ? action.updated : idea
          ),
        ],
      };

    case actionType.UPDATE_MANY:
      const updated = action.ideas.reduce(
        (acc, idea) => {
          return {
            ids: [...acc.ids],
            lookup: { ...acc.lookup, [idea.id]: idea },
          };
        },
        { ids: [], lookup: {} }
      );

      return {
        ...idea,
        data: [
          ...idea.data.map((storedIdea) =>
            updated.ids.includes(storedIdea.id)
              ? updated.lookup[storedIdea.id]
              : storedIdea
          ),
        ],
      };

    case actionType.EMPTY:
      return {
        ...idea,
        data: [],
      };

    case actionType.LOADING:
      return {
        ...idea,
        isError: false,
        isLoading: action.isLoading,
      };

    case actionType.ERROR:
      return {
        ...idea,
        isError: true,
        message: action.message,
      };
    default:
      return idea;
  }
};

export default ideaReducer;
