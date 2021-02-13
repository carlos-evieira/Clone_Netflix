import React, {useEffect, useState} from 'react'
import './App.css'
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow'
import FeaturedMovie from './components/FeaturedMovie'
export default () => {

  const [movielist, setMovielist] = useState([]);
  const [featuredData, setFeaturedData] = useState(null)

  useEffect(()=>{
    const loadall = async () => {
      // Pegando a lista total
      let list = await Tmdb.getHomelist()
      setMovielist(list)

      // Pegando o Featured(filme em destaque)
      let originals = list.filter(i=>i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length -1))
      let chosen = originals[0].items.results[randomChosen] 
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo);
    }

    loadall()
  }, [])

  return(
    <div className="page">
      {featuredData && 
        <FeaturedMovie item={featuredData}/>
      }
      <section className="lists">
        {movielist.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/> 
        ))}
      </section>
    </div>
  )
}