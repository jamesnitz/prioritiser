import React, { useState, useEffect } from "react";

export const UserContext = React.createContext();

export const UserProvider = (props) => {
    const [users, setUsers] = useState([]);

    const getUsers = () => {
        return fetch("http://localhost:8088/users")
            .then(res => res.json())
            .then(setUsers)
    };

    const addUser = user => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(getUsers)
    };

    const deleteUser = user => {
      return fetch(`http://localhost:8088/users/${user.id}`, {
        method: "DELETE",
      })
        .then(getUsers)
    };

    const editUser = user => {
      return fetch(`http://localhost:8088/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
        .then(getUsers)
    };

   
    useEffect(() => {
        getUsers()
    }, []);

    useEffect(() => {
        console.log("User app state change")
    }, [users]);

    return (
      <UserContext.Provider value = {{
        users, addUser, deleteUser, editUser
      }}>
          {props.children}
      </UserContext.Provider>
    )
  
}