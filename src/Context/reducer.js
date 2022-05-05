import { SET_USER, SET_LOADING } from "./actions.type";

export const initialState = {
  user: null,
  loading: true,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
          ? { email: action.payload.email, name: action.payload.name }
          : null,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
  }
};
