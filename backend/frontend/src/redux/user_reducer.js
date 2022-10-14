const SET_USER = "user/SET_USER";
const LOG_OUT = "user/LOG_OUT";

export const setUser = (user) => ({ type: SET_USER, user });
export const logOut = () => ({ type: LOG_OUT });

const initialState = {
  nowLoginUser: {},
  isLogined: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, nowLoginUser: action.user, isLogined: true };
    case LOG_OUT:
      return { ...state, nowLoginUser: [], isLogined: false };
    default:
      return state;
  }
};

export default userReducer;
