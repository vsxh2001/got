import { EventTable, EventApi } from "../components/Event";
import { Season } from "../api_types/models";
import axios from "axios";
import { Layout } from "../components/Layout";
import { TextBox } from "../components/TextBox";

const backend_url = import.meta.env.VITE_BACKEND_URL + "/seasons";

const SeasonApi: EventApi = {
  list: async () => {
    const res = await axios.get(backend_url);
    return res.data;
  },
  get: async (id: number) => {
    const res = await axios.get(backend_url + "/" + id);
    return res.data;
  },
  create: async (season: Season) => {
    const res = await axios.post(backend_url, season);
    return res.data;
  },
  update: async (id: number, season: Season) => {
    const res = await axios.put(backend_url + "/" + id, season);
    return res.data;
  },
  delete: async (id: number) => {
    const res = await axios.delete(backend_url + "/" + id);
    return res.data;
  },
  start: async (id: number) => {
    const res = await axios.post(backend_url + "/" + id + "/start");
    return res.data;
  },
  end: async (id: number) => {
    const res = await axios.post(backend_url + "/" + id + "/end");
    return res.data;
  },
};

export function SeasonsPage() {
  return (
    <Layout>
      <h1 className="text-5xl sm:text-6xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-red-200 to-amber-100 mb-12 py-3">
        Seasons
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <TextBox>
            <h2 className="text-2xl font-bold mb-4">About Seasons</h2>
            <p>
              Seasons in Game of Thrones represent distinct periods of gameplay
              where players compete for influence and power. Each season brings
              new opportunities for alliances, conquests, and strategic
              decisions.
            </p>
            <p className="mt-4">
              Track the progress of current and past seasons, including their
              start and end dates, winners, and significant events that shaped
              the outcome of each season.
            </p>
          </TextBox>
        </div>
        <div className="lg:w-2/3">
          <EventTable event_api={SeasonApi} view_url="/seasons/{id}" />
        </div>
      </div>
    </Layout>
  );
}
