import { TableState } from "@/interface/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: TableState = {
  state: {},
};
const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTableState(
      state: TableState,
      action: PayloadAction<{ pagination?: any }>
    ) {
      state.state["table"] = Object.assign(
        state.state["table"] || {},
        action.payload
      );
      return state;
    },
  },
  extraReducers: () => {},
});
const { actions, reducer } = tableSlice;
// Extract and export each action creator by name
export const { setTableState } = actions;
// Extract and export each action creator by name
// Export the reducer, either as a default or named export
export default reducer;
