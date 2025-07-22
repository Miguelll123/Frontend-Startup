import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import mentoringSessionService from "./mentoringSessionsService";

const initialState = {
  sessions: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const fetchSessionsByMentor = createAsyncThunk(
  "sessions/byMentor",
  async (mentorId, thunkAPI) => {
    try {
      return await mentoringSessionService.getSessionsByMentor(mentorId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.msg || error.message);
    }
  }
);

export const fetchSessionsByStartup = createAsyncThunk(
  "sessions/byStartup",
  async (startupId, thunkAPI) => {
    try {
      return await mentoringSessionService.getSessionsByStartup(startupId);
    } catch (error) {
      console.error("Thunk fetchSessionsByStartup: Error capturado:", error);
      return thunkAPI.rejectWithValue(error.response?.data?.msg || error.message);
    }
  }
);

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

export const signMentor = createAsyncThunk(
  "sessions/signMentor",
  async ({ sessionId, signatureDataUrl }, thunkAPI) => {
    // Desestructuramos el payload
    try {
      console.log("Thunk signMentor: Despachando firma para sessionId:", sessionId);
      return await mentoringSessionService.signAsMentor(sessionId, signatureDataUrl);
    } catch (error) {
      console.error("Thunk signMentor: Error al firmar como mentor:", error);
      return thunkAPI.rejectWithValue(error.response?.data?.msg || error.message);
    }
  }
);

export const signStartup = createAsyncThunk(
  "sessions/signStartup",
  async ({ sessionId, signatureDataUrl }, thunkAPI) => {
    // Desestructuramos el payload
    try {
      console.log("Thunk signStartup: Despachando firma para sessionId:", sessionId);
      return await mentoringSessionService.signAsStartup(sessionId, signatureDataUrl);
    } catch (error) {
      console.error("Thunk signStartup: Error al firmar como startup:", error);
      return thunkAPI.rejectWithValue(error.response?.data?.msg || error.message);
    }
  }
);

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
    resetCreateStatus: (state) => {
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
        state.isLoading = false;
        state.isSuccess = true;
        state.sessions.push(action.payload);
        state.message = action.payload.msg || "Sesión creada exitosamente.";
      })
      .addCase(signMentor.pending, (state) => {
        state.isLoading = true;
        console.log("Redux Slice: signMentor.pending");
      })
      .addCase(signMentor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const idx = state.sessions.findIndex((s) => s._id === action.payload._id);
        if (idx !== -1) {
          state.sessions[idx] = action.payload; // Actualiza la sesión con los datos recibidos
        }
        console.log("Redux Slice: signMentor.fulfilled, payload:", action.payload);
      })
      .addCase(signMentor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.error("Redux Slice: signMentor.rejected, error:", action.payload);
      })

      .addCase(signStartup.pending, (state) => {
        state.isLoading = true;
        console.log("Redux Slice: signStartup.pending");
      })
      .addCase(signStartup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const idx = state.sessions.findIndex((s) => s._id === action.payload._id);
        if (idx !== -1) {
          state.sessions[idx] = action.payload; // Actualiza la sesión con los datos recibidos
        }
        console.log("Redux Slice: signStartup.fulfilled, payload:", action.payload);
      })
      .addCase(signStartup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        console.error("Redux Slice: signStartup.rejected, error:", action.payload);
      })

      .addCase(fetchSessionsByMentor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSessionsByMentor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sessions = action.payload;
      })
      .addCase(fetchSessionsByMentor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchSessionsByStartup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSessionsByStartup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sessions = action.payload;
      })
      .addCase(fetchSessionsByStartup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetSessions } = mentoringSessionSlice.actions;
export default mentoringSessionSlice.reducer;
