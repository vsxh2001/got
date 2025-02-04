/* tslint:disable */
/* eslint-disable */
/**
/* This file was automatically generated from pydantic models by running pydantic2ts.
/* Do not modify it by hand - just update the pydantic models and then re-run the script
*/

export type EventStatus = "pending" | "ongoing" | "completed";

export interface Event {
  id?: number | null;
  name: string | null;
  start: string | null;
  end: string | null;
  status?: EventStatus | null;
}
export interface Season {
  id?: number | null;
  name: string | null;
  start: string | null;
  end: string | null;
  status?: EventStatus | null;
}
export interface SQLModel {}
