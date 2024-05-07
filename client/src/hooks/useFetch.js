import { useEffect, useState, useMemo } from 'react';

const useFetch = (url, locale) => {
  const [blogData, setBlogData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useMemo(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        const json = await res.json();
        setBlogData(json);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, locale]);

  return { loading, error, blogData };
};

export default useFetch;





// import { useEffect, useState } from 'react';
// const useFetch = (url) => {
//     const [blogData, setData] = useState(null)
//     const [error, setError] = useState(null)
//     const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true)
//             try {
//                 const res = await fetch(url)
//                 const json = await res.json()
//                 setData(json)
//                 setLoading(false)
//             } catch (error) {
//                 setError(error)
//                 setLoading(false)
//             }
//         }
//         fetchData()

//     }, [url])


//     return { loading, error, blogData }
// }

// export default useFetch