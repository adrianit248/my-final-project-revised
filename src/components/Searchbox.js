import React, { useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'


const Searchbox = (props) => {
const [searchParam, setSearchParam] = useState('')

  return (
    <div className='col col-sm-4'>
        <div className='searchbar-assembly'>
            <input 
                className='form-control'  
                value={props.value}
                onChange={(event) => {setSearchParam(event.target.value)}}
                placeholder='Type to Search'
                onKeyPress={(event) => {
                    if (event.key === "Enter") {
                    props.setSearchValue(searchParam);
                    }
                }}
            ></input>
            <FaMagnifyingGlass className='magnifying-glass' 
            onClick={(event) => {props.setSearchValue(searchParam)}}
            />
        </div>
    </div>
  )
}

export default Searchbox