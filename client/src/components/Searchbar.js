import React from 'react'

export default function Searchbar() {
  return (
    <div className='searchBar'>

        <div className="type">
            <button>Buy</button>
            <button>Rent</button>
        </div>

        <form action="">
            <input type="text" name="location" placeholder='city Location' id="" />
            <input 
                type="text"
                name='minPrice'
                min={0}
                max={1000000}
                placeholder='Min Price'
            
            />
            <input 
                type="text" 
                name='maxPrice'
                min={0}
                max={1000000}
                placeholder='Max Price'
            />
            <button>
                <img src="images/search.png" alt="" />
            </button>
        </form>
      
    </div>
  )
}
