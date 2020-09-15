import axios from "axios";
import useSWR, { useSWRInfinite } from "swr";

import { PAGE_SIZE } from "../constants";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export function useGet(url) {
  const { data, error } = useSWR(url, fetcher);

  return {
    data,
    isLoading: !data && !error,
    error,
  };
}

export function useScroll(url) {
  const { data, size, setSize, error } = useSWRInfinite(
    (pageIndex, previousPageData) => {
      if (previousPageData && !previousPageData.length) {
        return null;
      }
      return `${url}?limit=${PAGE_SIZE}&offset=${pageIndex * PAGE_SIZE}`;
    },
    fetcher
  );

  const isEmpty = data && data[0] && data.length === 0;
  const isEnd =
    isEmpty ||
    (data && data[data.length - 1] && data[data.length - 1].length < PAGE_SIZE);

  const isLoadingInitialData = !data && !error;
  const isLoading =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");

  return {
    data,
    isLoading,
    isEnd,
    loadNextPage: () => setSize(size + 1),
  };
}
