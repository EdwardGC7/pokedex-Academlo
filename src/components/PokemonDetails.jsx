import axios from 'axios'
// import React, { useState } from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'



const PokemonDetails = () => {

  const [pokeInfo, setPokeInfo] = useState()

  const {id} = useParams()

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`
    axios.get(URL)
    .then(res => setPokeInfo(res.data))
    .catch(err => console.log(err))
  }, [])

  const style = `${pokeInfo?.types[0].type.name}`

  return (
    <div className={`display-container`} >
      <div className='display-header'>
      <article className='pokemon-display'>
      <h1 className={`display-name ${style}`}>{pokeInfo?.name}</h1>
      <img src={pokeInfo?.sprites.other['official-artwork']["front_default"]} alt="" />
    </article>
    <ul className='display-type'>
        {
          pokeInfo?.types.map((slot, index) => (
            <div key={slot.type.url}>{slot.type.name} {pokeInfo.types.length >1 && index < pokeInfo.types.length-1 ? '/': ''}</div>
            
          ))
        }
        </ul>
      </div>
    <ul className='display-stats-container'>
          {
            pokeInfo?.stats.map(stat => (
              <li key={stat.stat.url} className='display-stats'>
                <h4>{stat.stat.name} / <span>{stat.base_stat}</span></h4>
              </li>
            ))
          }
        </ul>
    </div>
  )
}

export default PokemonDetails