import { EventTable, EventApi } from "../components/Event";
import { Season } from "../api_types/models";
import axios from "axios";
import { Layout } from "../components/Layout";

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
      <h1>Seasons</h1>
      <EventTable
        event_api={SeasonApi}
        event_name="season"
        view_url="/seasons/{id}"
      />
    </Layout>
  );
}
