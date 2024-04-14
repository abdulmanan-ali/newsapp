import React from 'react';
import { Navbar, Footer, BlogContent } from "../components"

const BlogContentPage = ({ blogs }) => {
  console.log(blogs)

  return (
    <div>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow px-4 py-8"> <BlogContent blogs={blogs} />  </main>
        <Footer />
      </div>
    </div>
  )
}

export default BlogContentPage