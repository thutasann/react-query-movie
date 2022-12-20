import Header from "../components/Header";
import React from "react";
import Hero from "../components/Hero";

export default function Home() {

  const [ query, setQuery ] = React.useState('');

  return (
    <main className="relative h-screen overflow-y-scroll">
      <Header setQuery={setQuery}/>
      {/* <Hero/> */}
    </main>
  )
}
