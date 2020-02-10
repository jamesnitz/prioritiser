import React, { useState, useEffect } from "react"

export const ListContext = React.createContext()

export const ListProvider = (props) => {
    const [lists, setList] = useState([])

    const getLists = () => {
        return fetch("http://localhost:8088/lists")
            .then(res => res.json())
            .then(setList)
    }

    const addList = list => {
        return fetch("http://localhost:8088/lists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(list)
        })
            .then(getLists)
    }
   
    useEffect(() => {
        getLists()
    }, [])

    useEffect(() => {
        console.log("List app state change")
    }, [lists])

    return (
      <ListContext.Provider value = {{
        lists, addList, 
      }}>
          {props.children}
      </ListContext.Provider>
    )
  
}