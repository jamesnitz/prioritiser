import React, { useState, useEffect } from "react"

export const SharedListContext = React.createContext()

export const SharedListProvider = (props) => {
    const [sharedLists, setSharedLists] = useState([])

    const getSharedLists = () => {
        return fetch("http://localhost:8088/sharedLists?_expand=user&_expand=list")
            .then(res => res.json())
            .then(setSharedLists)
    }

    const addSharedList = sharedList => {
        return fetch("http://localhost:8088/sharedLists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sharedList)
        })
            .then(getSharedLists)
    }

    const deleteSharedList = sharedList => {
      return fetch(`http://localhost:8088/sharedLists/${sharedList.id}`, {
        method: "DELETE",
      })
        .then(getSharedLists)
    }

 
   
    useEffect(() => {
        getSharedLists()
    }, [])

    useEffect(() => {
        console.log("SharedList app state change")
    }, [sharedLists])

    return (
      <SharedListContext.Provider value = {{
        sharedLists, addSharedList, deleteSharedList 
      }}>
          {props.children}
      </SharedListContext.Provider>
    )
  
}