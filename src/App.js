import React, {useEffect, useState} from 'react'
import './App.css'
import Tmdb from './Tmdb'
import MovieRow from './components/MovieRow'
import FeaturedMovie from './components/FeaturedMovie'
import Header from './components/Header'




export default () => {

  const [movielist, setMovielist] = useState([]);
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

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

  useEffect(()=>{
    const scrollListener = ()=>{
      if(window.scrollY > 10){
        setBlackHeader(true)
      }else{
        setBlackHeader(false)
      }
    }
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])

  return(
    <div className="page">

      <Header black={blackHeader}/>

      {featuredData && 
        <FeaturedMovie item={featuredData}/>
      }
      <section className="lists">
        {movielist.map((item, key)=>(
          <MovieRow key={key} title={item.title} items={item.items}/> 
        ))}
      </section>
      <footer>
        Feito com <span role="img" aria-label="coração">❤️</span> pelo Kadu com tutorial da b7Web<br/>
        Direitos de imagem para Netflix<br/>
        Dados obtidos no site Themoviedb.org
      </footer>

      {movielist.length <=0 &&   
      <div className = "loading">
        <img src="https://media.filmelier.com/news/br/2020/03/Netflix_LoadTime.gif"/>
      </div>
      }  
    </div>
  )
}