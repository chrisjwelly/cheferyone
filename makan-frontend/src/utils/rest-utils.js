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
    isUnauthorized: error && error.response && error.response.status === 401,
    isForbidden: error && error.response && error.response.status === 403,
    isNotFound: error && error.response && error.response.status === 404,
  };
}

export function useInfinite(url) {
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
  const isLoadingNextPage =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");

  return {
    data,
    isLoading: !data && !error,
    error,
    isUnauthorized: error && error.response && error.response.status === 401,
    isForbidden: error && error.response && error.response.status === 403,
    isNotFound: error && error.response && error.response.status === 404,
    isLoadingNextPage,
    isEnd,
    loadNextPage: () => setSize(size + 1),
  };
}
