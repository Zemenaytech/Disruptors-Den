import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogSlice";
import eventReducer from "./eventSlice";

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    event: eventReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
