import React, { useState } from 'react'
import Search from './Search';

const SideBar = () => {
  //for getting & setting up the particular user searched
  const [searchKey, setSearchKey] = useState("");

  return (
    <div className='app-sidebar'>
      {/* SEARCH USER */}
      <Search
       searchKey = {searchKey}
       setSearchKey = {setSearchKey}
        ></Search>
      {/* USER LIST*/}
    </div>
  )
}
export default SideBar;