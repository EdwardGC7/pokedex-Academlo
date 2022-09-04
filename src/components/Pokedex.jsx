import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PokemonCard from './Pokedex/PokemonCard'
import { useSelector } from 'react-redux'
import SearchInput from './Pokedex/SearchInput'
import SelectType from './Pokedex/SelectType'
import Pagination from './Pagination'


const Pokedex = () => {

  const [pokemons, setPokemons] = useState()
  const [pokeSearch, setPokeSearch] = useState()
  const [optionType, setOptionType] = useState('All')
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showpagination, setShowpagination] = useState(false)

  useEffect(() => {
    setLoading(true)
    // let URL
    if (optionType !== 'All') {
      const URL = `https://pokeapi.co/api/v2/type/${optionType}/`
       axios.get(URL)
       .then(res => {
        const arr = res.data.pokemon.map(e => e.pokemon)
        setPokemons({results:arr})
        setLoading(false)
        setShowpagination(false)
        }
       )
       .catch(err => console.log(err))
      
      
    }else if(pokeSearch){
        
        const url = `https://pokeapi.co/api/v2/pokemon/${pokeSearch}`
        const obj = {
          results: [
            {
              url 
            }
          ]
        }
        setPokemons(obj)
        setShowpagination(false)
        setLoading(false)
    }else{
      
      let limit = 20
      let offset = 20 * page
      const URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
       axios.get(URL)
       .then(res => {
        setPokemons(res.data)
        console.log(res.data);
        setLoading(false)
        setTotal(Math.ceil(res.data.count / 20))
        setShowpagination(true)
        }
       )
       .catch(err => console.log(err))
    }

  }, [pokeSearch, optionType, page])

  console.log(optionType);
  
  const nameTrainer = useSelector(state => state.nameTrainer)

  const lastPage = () => {
    const nextPage = Math.max(page - 1, 0)
    setPage(nextPage)
  }
  const nextPage = () => {
    const nextPage = Math.min(page + 1, total)
    setPage(nextPage)
  }
  
  return (
    <div>
        <div className='trainer-welcome'>Welcome {nameTrainer}, catch them all.</div>
        <SearchInput setOptionType={setOptionType} setPokeSearch={setPokeSearch}/>
        <div className='select-and-pagination'>
        <SelectType setPokeSearch={setPokeSearch} optionType={optionType}  setOptionType={setOptionType} />
        {showpagination && <Pagination page={page + 1} totalPages={total} onLeftClick={lastPage} onRightClick={nextPage}/>}
        </div>
        <div className='cards-container'>
        { loading ? <div>Cargando pokemones...</div>:
          pokemons?.results.map(pokemon => (
            <PokemonCard key={pokemon.url} url={pokemon.url}/>
          ))
        }
      </div>
    </div>
  )
}

export default Pokedex