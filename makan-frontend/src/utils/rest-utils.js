import axios from "axios";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function useGet(url) {
  const { data, error } = useSWR(url, fetcher);

  return {
    data,
    isLoading: !data && !error,
    error,
  };
}
