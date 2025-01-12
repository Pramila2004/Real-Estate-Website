import React from "react";
import './componentsStyle.css'

export default function Filter() {
  return (
    <div className="filter-box">
      <h1>
        Search result for <b>Landon</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input type="text" name="city" placeholder="City Location" id="city" />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select name="type" id="type">
            <option value="any">any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        <div className="item">
          <label htmlFor="property">Property</label>
          <select name="property" id="property">
            <option value="any">any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="land">Land</option>
          </select>
        </div>

        <div className="item">
          <label htmlFor="minPrice">Min price</label>
          <input type="text" id="minPrice" name="minPrice" placeholder="any" />
        </div>

        <div className="item">
          <label htmlFor="maxPrice">Max price</label>
          <input type="text" id="maxPrice" name="maxPrice" placeholder="any" />
        </div>

        <div className="item">
          <label htmlFor="bedroom">Bedroom</label>
          <input type="text" id="bedroom" name="bedroom" placeholder="any" />
        </div>

        <button className="search-btn">
          <img src="images/search.png" alt="Search" />
        </button>
      </div>
    </div>
  );
}
