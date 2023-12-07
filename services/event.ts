import axios from "axios";

interface AddEventPayload {
  title: string;
  description: string;
  post_by: string;
  event_type: string;
  address: string;
  start_date: Date;
  end_date: Date;
}

export const addEventService = (payload: AddEventPayload) =>
  axios.post("/api/events", payload);
