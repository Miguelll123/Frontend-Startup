import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import mentoringSessionService from "./mentoringSessionsService";

const initialState = {
  sessions: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

// Thunks
export const fetchAllSessions = createAsyncThunk("sessions/getAll", async (_, thunkAPI) => {
  try {
    return await mentoringSessionService.getAllSessions();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg || error.message);
  }
});

export const createMentoringSession = createAsyncThunk(
  "sessions/create",
  async (data, thunkAPI) => {
    try {
      return await mentoringSessionService.createSession(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.msg || error.message);
    }
  }
);

export const signMentor = createAsyncThunk("sessions/signMentor", async (id, thunkAPI) => {
  try {
    return await mentoringSessionService.signAsMentor(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg || error.message);
  }
});

export const signStartup = createAsyncThunk("sessions/signStartup", async (id, thunkAPI) => {
  try {
    return await mentoringSessionService.signAsStartup(id);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg || error.message);
  }
});

export const mentoringSessionSlice = createSlice({
  name: "mentoringSessions",
  initialState,
  reducers: {
    resetSessions: (state) => {
      state.sessions = [];
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSessions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllSessions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sessions = action.payload;
      })
      .addCase(fetchAllSessions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createMentoringSession.fulfilled, (state, action) => {
        state.sessions.push(action.payload);
      })
      .addCase(signMentor.fulfilled, (state, action) => {
        const idx = state.sessions.findIndex((s) => s._id === action.payload._id);
        if (idx !== -1) state.sessions[idx] = action.payload;
      })
      .addCase(signStartup.fulfilled, (state, action) => {
        const idx = state.sessions.findIndex((s) => s._id === action.payload._id);
        if (idx !== -1) state.sessions[idx] = action.payload;
      });
  },
});

export const { resetSessions } = mentoringSessionSlice.actions;
export default mentoringSessionSlice.reducer;
