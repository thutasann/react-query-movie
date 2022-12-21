import Header from "../components/Header";
import React from "react";
import Hero from "../components/Hero";
// Fetch Hook
// will use React-query only in the client side;
import { useFetchMovies } from "../api/fetchHooks";
import {
  IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE
} from "../config";
import Grid from "../components/Grid";
import Link from "next/link";
import Card from "../components/Card";
import Spinner from "../components/Spinner";


export default function Home() {

  const [ query, setQuery ] = React.useState('');

  const {
    data,
    fetchNextPage,
    isLoading,
    isFetching,
    error
  } = useFetchMovies(query);

  const handleScroll = (e: React.UIEvent<HTMLElement>) =>{
    const { scrollTop, clientHeight, scrollHeight  } = e.currentTarget;
    if(scrollHeight - scrollTop === clientHeight){
      fetchNextPage();
    }
  }

  if (error) return <div className="text-red-500 font-bold text-[40px]">SOMETHING WENT WRONG!</div>

  return (
    <main className="relative h-screen overflow-y-scroll" onScroll={handleScroll}>
      {/* Header */}
      <Header setQuery={setQuery}/>

      {/* Hero */}
      {
        !query && data && data.pages ? (
          <Hero
            imgUrl={
              data?.pages[0].results[0].backdrop_path
              ? IMAGE_BASE_URL + BACKDROP_SIZE + data.pages[0].results[0].backdrop_path
              : '/no_image.jpg'
            }
            title={data?.pages[0].results[0].title}
            text={data?.pages[0].results[0].overview}
          />
        ) : null
      }

      {/* Movie Cards */}
      <Grid
        className="p-4 max-w-7xl m-auto"
        title={query ? `Search Results: ${data?.pages[0].total_pages}` : "Popular Movies"}
      >
        {
          data && data.pages ?
          data.pages.map(page => 
            page.results.map(movie => (
              <Link key={movie.id} href={`/${movie.id}`}>
                <div className="cursor-pointer hover:opacity-80 duration-300">
                  <Card
                    imgUrl={movie.poster_path ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path : "/no_image.jpb" }
                    title={movie.original_title}
                  />
                </div>
              </Link>
            ))  
          ) : null
        }
      </Grid>

      {
        isLoading || isFetching ? <Spinner/> : null
      }

    </main>
  )
}
