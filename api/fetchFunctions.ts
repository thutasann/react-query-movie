import { Movies } from "./types";

/**
 * Basic Fetch
 */
export const basicFetch = async <returnType>(endpoint: string): Promise<returnType> =>{
    const response = await fetch(endpoint);

    if(!response.ok) throw new Error("Error!");

    const data = await response.json();

    return data;
};


/** 
 * Fetch Fucntions For Client Side
 */
export const fetchMovies = async(search = '', page = 1) : Promise<Movies> => {
    return await basicFetch<Movies>(`/api/movies?search=${search}&page=${page}`);
};