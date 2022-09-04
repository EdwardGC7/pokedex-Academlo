import React from 'react'

const Pagination = (props) => {
  const {onLeftClick, onRightClick, page, totalPages} = props;
  return (
    <div className='pagination-items'>
      <button onClick={onLeftClick} ><i className="fa-solid fa-arrow-left"></i></button>
      <div>{page} de {totalPages}</div>
      <button onClick={onRightClick}><i className="fa-solid fa-arrow-right"></i></button>
    </div>
  )
}

export default Pagination