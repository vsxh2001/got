import { useEffect, useState } from "react";
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
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-indigo-300 mb-4 capitalize">
        {status} Events
      </h2>
      <div className="bg-slate-800/50 ring-1 ring-gray-700/50 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Start
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                End
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {events.map((event) => (
              <tr
                key={event.id}
                className="hover:bg-slate-700/30 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {event.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {new Date(event.start!).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {new Date(event.end!).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <Link
                    to={`${view_url}/${event.id}`}
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded text-sm font-medium text-white transition-colors"
                  >
                    View
                  </Link>

                  {status === "pending" && (
                    <ActionButton
                      onClick={() => onStart(event.id!)}
                      label="Start"
                      colorClass="bg-green-600 hover:bg-green-700 text-white"
                    />
                  )}

                  {status === "ongoing" && (
                    <ActionButton
                      onClick={() => onEnd(event.id!)}
                      label="End"
                      colorClass="bg-yellow-600 hover:bg-yellow-700 text-white"
                    />
                  )}

                  {status !== "completed" && (
                    <ActionButton
                      onClick={() => onDelete(event.id!)}
                      label="Delete"
                      colorClass="bg-red-600 hover:bg-red-700 text-white"
                    />
                  )}
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 text-center text-sm text-gray-400"
                >
                  No {status} events found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export function EventTable({
  event_api,
  event_name,
  view_url,
}: EventTableProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  }, [event_api]);

  const handleStart = async (id: number) => {
    try {
      await event_api.start(id);
      await fetchEvents(); // Refresh the list
    } catch (err) {
      console.error("Error starting event:", err);
      setError("Failed to start event");
    }
  };

  const handleEnd = async (id: number) => {
    try {
      await event_api.end(id);
      await fetchEvents(); // Refresh the list
    } catch (err) {
      console.error("Error ending event:", err);
      setError("Failed to end event");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await event_api.delete(id);
      await fetchEvents(); // Refresh the list
    } catch (err) {
      console.error("Error deleting event:", err);
      setError("Failed to delete event");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-indigo-300">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 text-red-300">
        {error}
      </div>
    );
  }

  const statuses: EventStatus[] = ["pending", "ongoing", "completed"];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-red-200 to-amber-100">
        {event_name} Events
      </h1>
      {statuses.map((status) => (
        <EventStatusTable
          key={status}
          events={events.filter((event) => event.status === status)}
          status={status}
          onStart={handleStart}
          onEnd={handleEnd}
          onDelete={handleDelete}
          view_url={view_url}
        />
      ))}
    </div>
  );
}
