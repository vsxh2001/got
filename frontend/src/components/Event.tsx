import { useEffect, useState, useRef } from "react";
import { Event, EventStatus } from "../api_types/models";
import { Link } from "react-router-dom";

export interface EventApi {
  get(id: number): Promise<Event>;
  list(): Promise<Event[]>;
  create(event: Event): Promise<Event>;
  update(id: number, event: Event): Promise<Event>;
  delete(id: number): Promise<void>;
  start(id: number): Promise<Event>;
  end(id: number): Promise<Event>;
}

interface EventTableProps {
  event_api: EventApi;
  event_name: string;
  view_url: string;
}

interface ActionButtonProps {
  onClick: () => void;
  label: string;
  colorClass: string;
}

const ActionButton = ({ onClick, label, colorClass }: ActionButtonProps) => (
  <button
    onClick={onClick}
    className={`${colorClass} px-3 py-1 rounded text-sm font-medium transition-colors`}
  >
    {label}
  </button>
);

const EventStatusTable = ({
  events,
  status,
  onStart,
  onEnd,
  onDelete,
  view_url,
}: {
  events: Event[];
  status: EventStatus;
  onStart: (id: number) => Promise<void>;
  onEnd: (id: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  view_url: string;
}) => {
  // Track events with animation states
  const [animatingEvents, setAnimatingEvents] = useState<
    Record<number, string>
  >({});

  // Handle event deletion with animation
  const handleDelete = async (id: number) => {
    // Set fade out animation
    setAnimatingEvents((prev) => ({ ...prev, [id]: "animate-fade-out" }));

    // Wait for animation to complete before actual deletion
    setTimeout(async () => {
      await onDelete(id);
    }, 400); // Match the animation duration
  };

  // Handle event start with animation
  const handleStart = async (id: number) => {
    // Set slide out animation
    setAnimatingEvents((prev) => ({ ...prev, [id]: "animate-slide-out-left" }));

    // Wait for animation to complete before actual start
    setTimeout(async () => {
      await onStart(id);
    }, 500); // Match the animation duration
  };

  // Handle event end with animation
  const handleEnd = async (id: number) => {
    // Set slide out animation
    setAnimatingEvents((prev) => ({ ...prev, [id]: "animate-slide-out-left" }));

    // Wait for animation to complete before actual end
    setTimeout(async () => {
      await onEnd(id);
    }, 500); // Match the animation duration
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-indigo-300 mb-4 capitalize">
        {status} Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.length === 0 ? (
          <div className="col-span-full bg-slate-800/50 ring-1 ring-gray-700/50 rounded-lg p-6 text-center text-sm text-gray-400">
            No {status} events found
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className={`bg-slate-800/50 ring-1 ring-gray-700/50 rounded-lg overflow-hidden hover:ring-indigo-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 ${
                animatingEvents[event.id!] || "animate-fade-in"
              }`}
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium text-gray-200">
                    {event.name}
                  </h3>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      status === "pending"
                        ? "bg-blue-900/50 text-blue-300"
                        : status === "ongoing"
                          ? "bg-green-900/50 text-green-300"
                          : "bg-purple-900/50 text-purple-300"
                    }`}
                  >
                    {status}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">Start:</span>
                    <span>
                      {event.start
                        ? new Date(event.start).toLocaleDateString()
                        : "Not started"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">End:</span>
                    <span>
                      {event.end
                        ? new Date(event.end).toLocaleDateString()
                        : "Not ended"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    to={`${view_url}/${event.id}`}
                    className="inline-block bg-indigo-600 hover:bg-indigo-500 px-3 py-1 rounded text-sm font-medium text-white transition-colors"
                  >
                    View
                  </Link>

                  {status === "pending" && (
                    <ActionButton
                      onClick={() => handleStart(event.id!)}
                      label="Start"
                      colorClass="bg-green-600 hover:bg-green-500 text-white"
                    />
                  )}

                  {status === "ongoing" && (
                    <ActionButton
                      onClick={() => handleEnd(event.id!)}
                      label="End"
                      colorClass="bg-yellow-600 hover:bg-yellow-500 text-white"
                    />
                  )}

                  {status !== "completed" && (
                    <ActionButton
                      onClick={() => handleDelete(event.id!)}
                      label="Delete"
                      colorClass="bg-red-600 hover:bg-red-500 text-white"
                    />
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

interface AddEventFormProps {
  onSubmit: (event: Omit<Event, "id">) => Promise<void>;
}

function AddEventForm({ onSubmit }: AddEventFormProps) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formAnimation, setFormAnimation] = useState("animate-fade-in");

  const resetForm = () => {
    setName("");
    setStartDate("");
    setEndDate("");
  };

  const handleCancel = () => {
    setFormAnimation("animate-fade-out");
    setTimeout(() => {
      resetForm();
      setShowForm(false);
    }, 400); // Match animation duration
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      // Process dates with default time of midnight
      let startDateTime = null;
      let endDateTime = null;

      if (startDate) {
        const dateObj = new Date(startDate);
        dateObj.setHours(0, 0, 0, 0); // Set to midnight
        startDateTime = dateObj.toISOString();
      }

      if (endDate) {
        const dateObj = new Date(endDate);
        dateObj.setHours(0, 0, 0, 0); // Set to midnight
        endDateTime = dateObj.toISOString();
      }

      await onSubmit({
        name,
        status: "pending",
        start: startDateTime,
        end: endDateTime,
      });

      // Animate form out before hiding
      setFormAnimation("animate-fade-out");
      setTimeout(() => {
        resetForm();
        setShowForm(false);
        // Reset animation for next time
        setFormAnimation("animate-fade-in");
      }, 400);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showForm) {
    return (
      <div className="mb-8">
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:shadow-indigo-500/20 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add New Event
        </button>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div
        className={`bg-slate-800/70 ring-1 ring-gray-700/50 rounded-lg p-6 shadow-lg ${formAnimation}`}
      >
        <h3 className="text-xl font-bold text-indigo-300 mb-4">
          Add New Event
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Event Name */}
            <div>
              <label
                htmlFor="event-name"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Event Name <span className="text-red-500">*</span>
              </label>
              <input
                id="event-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter event name"
                className="w-full px-4 py-2 rounded-lg bg-gray-700/70 text-white border border-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all"
                disabled={isSubmitting}
                required
              />
            </div>

            {/* Start Date */}
            <div>
              <label
                htmlFor="start-date"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Start Date
              </label>
              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-700/70 text-white border border-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all"
                disabled={isSubmitting}
              />
            </div>

            {/* End Date */}
            <div>
              <label
                htmlFor="end-date"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                End Date
              </label>
              <input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-gray-700/70 text-white border border-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all"
                disabled={isSubmitting}
              />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !name.trim()}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium"
              >
                {isSubmitting ? "Adding..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export function EventTable({ event_api, view_url }: EventTableProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newEventId, setNewEventId] = useState<number | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const eventsList = await event_api.list();
      setEvents(eventsList);
    } catch (err) {
      setError("Failed to fetch events");
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleAddEvent = async (event: Omit<Event, "id">) => {
    try {
      const newEvent = await event_api.create(event as Event);
      // Set the new event ID to highlight it
      setNewEventId(newEvent.id!);

      // Clear the highlight after animation completes
      setTimeout(() => {
        setNewEventId(null);
      }, 2000);

      await fetchEvents();
    } catch (err) {
      console.error("Error adding event:", err);
    }
  };

  const handleStartEvent = async (id: number) => {
    try {
      await event_api.start(id);
      await fetchEvents();
    } catch (err) {
      console.error("Error starting event:", err);
    }
  };

  const handleEndEvent = async (id: number) => {
    try {
      await event_api.end(id);
      await fetchEvents();
    } catch (err) {
      console.error("Error ending event:", err);
    }
  };

  const handleDeleteEvent = async (id: number) => {
    try {
      await event_api.delete(id);
      await fetchEvents();
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const pendingEvents = events.filter((event) => event.status === "pending");
  const ongoingEvents = events.filter((event) => event.status === "ongoing");
  const completedEvents = events.filter(
    (event) => event.status === "completed",
  );

  return (
    <div>
      <AddEventForm onSubmit={handleAddEvent} />

      <EventStatusTable
        events={pendingEvents}
        status="pending"
        onStart={handleStartEvent}
        onEnd={handleEndEvent}
        onDelete={handleDeleteEvent}
        view_url={view_url}
      />

      <EventStatusTable
        events={ongoingEvents}
        status="ongoing"
        onStart={handleStartEvent}
        onEnd={handleEndEvent}
        onDelete={handleDeleteEvent}
        view_url={view_url}
      />

      <EventStatusTable
        events={completedEvents}
        status="completed"
        onStart={handleStartEvent}
        onEnd={handleEndEvent}
        onDelete={handleDeleteEvent}
        view_url={view_url}
      />
    </div>
  );
}
