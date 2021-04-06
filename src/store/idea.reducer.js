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
            idea.id === action.idea.id ? { ...idea, ...action.update } : idea
          ),
        ],
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
