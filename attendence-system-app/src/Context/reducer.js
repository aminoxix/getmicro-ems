import { SET_USER } from "./actions.type";

export const initialState = {
  user: null,
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
  }
};
