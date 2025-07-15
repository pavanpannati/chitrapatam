import React from 'react'
 

const Search = ({value,onChange}) => {
  return (


    <div className='mb-8 text-center'>
    <input type="text" 
    value={value}
    onChange={onChange}
    placeholder='Search movies'
    className='px-4 py-2 w-full max-w-xl rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-400 hover:scale-105 ' />
    </div>
)
}

export default Search