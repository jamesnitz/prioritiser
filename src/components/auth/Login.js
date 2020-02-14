import React, { useRef } from "react"
import { Link } from "react-router-dom";
import "./Login.css"
import {Button} from "react-bootstrap"

const Login = props => {
    const email = useRef()
    const password = useRef()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(_ => _.json())
            .then(user => {
                if (user.length) {
                    return user[0]
                }
                return false
            })
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists && exists.password === password.current.value) {
                    localStorage.setItem("user", exists.id)
                    props.history.push("/")
                } else if (exists && exists.password !== password.current.value) {
                    window.alert("Password does not match")
                }
            })
    }

    return (
        <>
            <h1 className="titleHeader">Prioritiser</h1>
        <main className=" form-group loginContainer">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h5>Please sign in</h5>
                    <fieldset className="logInUserContainer">
                        <label htmlFor="inputEmail"> Email address </label>
                        <input ref={email} type="email"
                            id="email"
                            className="form-control logInUser"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset className="logInPassContainer">
                        <label htmlFor="inputPassword"> Password </label>
                        <input ref={password} type="password"
                            id="password"
                            className="form-control logInPass"
                            placeholder="Password"
                            required />
                    </fieldset>
                    <fieldset>
                        <Button type="submit logInBUtton btn btn-primary">
                            Sign in
                    </Button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Sign Up</Link>
            </section>
        </main>
        </>
    )
}
export default Login