import React from 'react'

const SearchInput = ({setPokeSearch, setOptionType}) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    setOptionType('All')
    setPokeSearch(e.target.searchText.value.trim().toLowerCase());
  }

  return (
    <form onSubmit={handleSubmit}>
      <input className='search-item' placeholder='search' id='searchText' type="text" />
      <button className='search-item'>Search</button>
    </form>
  )
}

export default SearchInput