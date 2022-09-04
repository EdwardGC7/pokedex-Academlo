import  axios  from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatPokemon from './StatPokemon'

const PokemonCard = ({url}) => {

  const [pokemon, setPokemon] = useState()

  const navigate = useNavigate()
  let trying = true;

  useEffect(() => {
    axios.get(url)
    .then(res => setPokemon(res.data))
    .catch(err => {
      console.log(err)
      trying && alert("Este pokemon no existe, por favor intenta de nuevo")
      trying = false;
    })
  }, [])

  const handleClick = () => navigate(`/pokedex/${pokemon.name}`)

  const style = `${pokemon?.types[0].type.name}`
  
  

  return (
    <article className={`card ${style}`} onClick={handleClick}>
      <div>
      <header className='header'>
        <h3>{pokemon?.name}</h3>
        <ul>
        {
          pokemon?.types.map((slot, index) => (
            <div key={slot.type.url}>{slot.type.name} {pokemon.types.length >1 && index < pokemon.types.length-1 ? '/': ''}</div>
            
          ))
        }
        </ul>
      </header>
      <section className='card__img'>
        <img src={pokemon?.sprites.other["official-artwork"]["front_default"]} alt="" />
      </section>
      </div>
      <footer>
        <ul>
          {
            pokemon?.stats.map(stat => (
              <StatPokemon 
                key={stat.stat.url}
                infoStat={stat}
              />
            ))
          }
        </ul>
      </footer>
    </article>
  )
}

export default PokemonCard