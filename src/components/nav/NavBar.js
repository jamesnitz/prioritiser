import React, { useContext } from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import { UserContext } from "../users/UserProvider"
export default (props) => {
  const { users } = useContext(UserContext)
  const activeUserId = parseInt(localStorage.getItem("user"))
  const activeUser = users.find(user => user.id === activeUserId) || {}
  return (
    <ul className="navbar">
      <li className="navbar__item">Welcome {activeUser.name}</li>

      <li className="navbar__item">
        <Link className="navbar__link" to="/tasks">My List</Link>
      </li>

      <li className="navbar__item">
        <Link className="navbar__link" to="/archive">Archive</Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/profile">Profile</Link>
      </li>
      {
        localStorage.getItem("user")
          ? <li className="navbar__item">
            <Link className="navbar__link"
              to=""
              onClick={e => {
                e.preventDefault()
                localStorage.removeItem("user")
                props.history.push("/")
              }}
            >Logout</Link>
          </li>
          : ""
      }
    </ul>
  )
}