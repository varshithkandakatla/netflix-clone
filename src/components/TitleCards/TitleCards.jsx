  import React, { useEffect, useRef , useState} from 'react'
  import './TitleCards.css'
  import cards_data from '../../assets/cards/Cards_data'
  import { Link } from 'react-router-dom';


  const TitleCards = ({title,category}) => {
    const[apiData,setApiData] = useState([]);
    
    const cardsRef = useRef();

    const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MTFmMTI5Yjc3MzU1YTE3YmFlNTM0NTRjZTMzNTBjMSIsIm5iZiI6MTc1NzAwMTkyNy40MDMsInN1YiI6IjY4YjliOGM3Zjg5NmZjNjg0YjRlNGZiMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y32s2wq6oN1yjHCWOw0QiyR1wbgJd2tM5OvPniVmo04'
    }
  };



    const handleWheel = (event) => {
      event.preventDefault();
      cardsRef.current.scrollLeft += event.deltaY;
    }
    useEffect(() => {
  fetch(
    `https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`,
    options
  )
    .then(res => res.json())
    .then(res => {
      console.log("TMDB Response:", res); // 👀 debug in console
      if (res.results) {
        setApiData(res.results);
      } else {
        setApiData([]);
      }
    })
    .catch(err => console.error("API Error:", err));

  const cardsNode = cardsRef.current;
  cardsNode?.addEventListener("wheel", handleWheel);

  return () => {
    cardsNode?.removeEventListener("wheel", handleWheel);
  };
}, [category]); // 👈 refetch whenever category changes


    return (
      <div className='titlecards'>
        <h2>{title?title:"Popular on Netflix"}</h2>
        <div className="card-list" ref={cardsRef}>
          {apiData.map((card,index)=>{
            return <Link to={`/player/${card.id}`}className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          })}
        </div>
      </div>
    )
  }

  export default TitleCards
