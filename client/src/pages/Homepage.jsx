import React from 'react';
import { Blogs } from "../components"

const Homepage = ({ blogs }) => {



  return (
    <div>
      <div className="flex flex-col min-h-screen"> 
        <main className="flex-grow px-4 py-8"> <Blogs blogs={blogs} />   </main>
      </div>
    </div>
  )
}

export default Homepage