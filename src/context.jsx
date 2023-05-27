import React, { useContext, useEffect, useState } from 'react';

const AppContext = React.createContext();

export const API_URl = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const AppProvider = ({children}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const [isError, setIsError] = useState({show:"false", msg:""});
    const [query, setQuery] = useState("toy");

    const getMovies = async(url) => {
      setIsLoading(true);
           try{
              const res = await fetch(url);
              const data =await res.json();
              console.log(data);
              if (data.Response === "True"){
                 setIsLoading(false)
                 setMovie(data.Search)
              }else{
                 setIsError({
                    show: true,
                    msg: data.Error,
                 })
              }
           }catch(error){
            console.log(error)
           }
    }
   
    useEffect(()=>{
      let timeOut =setTimeout(()=>{getMovies(`${API_URl}&s=${query}`);},1000)  
      return () => clearTimeout(timeOut);
    },[query])

   return <AppContext.Provider value={{isLoading, movie, isError, query, setQuery}}>{children}</AppContext.Provider>
};

const useGlobalContext =() => {
    return useContext(AppContext)
};


export {AppContext, AppProvider, useGlobalContext};