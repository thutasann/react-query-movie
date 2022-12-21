import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMovies } from "./fetchFunctions";
import { Movies } from "./types";

export const useFetchMovies = (search: string) => {
    return useInfiniteQuery(
        ['movies', search], // key
        ({ pageParam = 1  }) => fetchMovies(search, pageParam), // fetch Function
        {
            getNextPageParam: (lastPage: Movies) => { // options for react query
                if (lastPage.page < lastPage.total_pages){
                    return lastPage.page + 1;
                }
                return undefined;
            },
            refetchOnWindowFocus: false,
            keepPreviousData: true
        }
    );
};