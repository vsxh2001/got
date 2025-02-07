export type EventStatus = "pending" | "ongoing" | "completed";

export interface Event {
  id?: number | null;
  name: string | null;
  start: string | null;
  end: string | null;
  status?: EventStatus | null;
}
export interface Season extends Event {}
