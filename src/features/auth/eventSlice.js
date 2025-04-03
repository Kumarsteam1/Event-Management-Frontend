import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://event-management-backend-2-rdl9.onrender.com/api/events" || "http://localhost:5000/api/events"; 

// Fetch all events
export const fetchEvents = createAsyncThunk(
	"events/fetchEvents",
	async (_, { getState, rejectWithValue }) => {
		try {
			const token = getState().auth.token;
			if (!token) return rejectWithValue("No auth token available");

			const response = await axios.get(API_URL, {
				headers: { Authorization: `Bearer ${token}` },
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data?.message || "Failed to fetch events");
		}
	}
);

// Fetch event by ID (Fixed Token Handling)
export const fetchEventById = createAsyncThunk(
	"events/fetchEventById",
	async ({ eventId }, { getState, rejectWithValue }) => {
		try {
			if (!eventId) return rejectWithValue("Invalid event ID");
			const token = getState().auth.token;
			if (!token) return rejectWithValue("No auth token available");

			const response = await axios.get(`${API_URL}/${eventId}`, {

				headers: { Authorization: `Bearer ${token}` },
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data?.message || "Failed to fetch event");
		}
	}
);

// Create Event API call
export const createEvent = createAsyncThunk(
	"events/createEvent",
	async ({ eventData }, { getState, rejectWithValue }) => {
		try {
			const token = getState().auth.token;
			if (!token) return rejectWithValue("No auth token available");

			const response = await axios.post(`${API_URL}/create`, eventData, {
				headers: { Authorization: `Bearer ${token}` },
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response || "Event creation failed");
		}
	}
);

// Update Event API call
export const updateEvent = createAsyncThunk(
	"events/updateEvent",
	async ({ eventId, formData }, { getState, rejectWithValue }) => {
		try {
			const token = getState().auth.token;
			if (!token) return rejectWithValue("No auth token available");

			const response = await axios.put(`${API_URL}/${eventId}`, formData, {
				headers: { Authorization: `Bearer ${token}` },
			});

			return response.data;
		} catch (error) {
			return rejectWithValue(error.response || "Failed to update event");
		}
	}
);

// Delete Event API call
export const deleteEvent = createAsyncThunk(
	"events/deleteEvent",
	async ({ eventId }, { getState, rejectWithValue }) => {
		try {
			if (!eventId) return rejectWithValue("Invalid event ID");
			const token = getState().auth.token;
			if (!token) return rejectWithValue("No auth token available");

			await axios.delete(`${API_URL}/${eventId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});

			return eventId;
		} catch (error) {
			return rejectWithValue(error.response || "Failed to delete event");
		}
	}
);


// Redux Slice
const eventSlice = createSlice({
	name: "events",
	initialState: {
		events: [],
		event: null,
		loading: false,
		error: null,
	},
	reducers: {
		setEvent: (state, action) => {
			state.event = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchEvents.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchEvents.fulfilled, (state, action) => {
				state.loading = false;
				state.events = action.payload;
			})
			.addCase(fetchEvents.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(fetchEventById.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchEventById.fulfilled, (state, action) => {
				state.loading = false;
				state.event = action.payload.event;
			})

			.addCase(fetchEventById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(updateEvent.pending, (state) => {
				state.loading = true;
			})
			.addCase(updateEvent.fulfilled, (state, action) => {
				state.loading = false;
				state.event = action.payload;
			})
			.addCase(updateEvent.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})

			.addCase(deleteEvent.pending, (state) => {
				state.loading = true;
			})
			.addCase(deleteEvent.fulfilled, (state, action) => {
				state.loading = false;

				if (Array.isArray(state.events.events)) {
						state.events.events = state.events.events.filter(event => event._id !== action.payload);
				} else {
						state.events = { events: [] }; 
				}
		})
		
			.addCase(deleteEvent.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export const { setEvent } = eventSlice.actions;
export default eventSlice.reducer;
