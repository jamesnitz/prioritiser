import React, { useRef, useState } from "react"
import {Button} from "react-bootstrap"

import "./Login.css"

const Register = props => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const [image, setImage] =useState("")
    const [loading, setLoading] = useState(false)

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append("file", files[0])
        data.append('upload_preset', 'prioritiser')
        setLoading(true)
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/durw1hitu/image/upload', 
            {
                method: "POST",
                body: data
            }
        )
        const file = await res.json()
        setImage(file.secure_url)
        setLoading(false)
    }

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(_ => _.json())
            .then(user => {
                if (user.length) {
                    return true
                }
                return false
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            existingUserCheck()
                .then(() => {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: email.current.value,
                            password: password.current.value,
                            name: `${firstName.current.value} ${lastName.current.value}`,
                            picture: image

                        })
                    })
                        .then(_ => _.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                localStorage.setItem("user", createdUser.id)
                                props.history.push("/")
                            }
                        })
                })
        } else {
            window.alert("Passwords do not match")
        }
    }

    return (
        <main  className="registerContainer" style={{ textAlign: "center" }}>
            <form className="form--login " onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal registerHeader">Please Register</h1>
                <fieldset>
                    <label htmlFor="firstName"> First Name </label>
                    <input ref={firstName} type="text"
                        name="firstName"
                        className="form-control registerUser"
                        placeholder="First name"
                        required autoFocus />
                </fieldset>
                <fieldset className="registerEmailContainer">
                    <label htmlFor="lastName"> Last Name </label>
                    <input ref={lastName} type="text"
                        name="lastName"
                        className="form-control registerEmail"
                        placeholder="Last name"
                        required />
                </fieldset>
                <fieldset className="registerPassContainer">
                    <label htmlFor="inputEmail"> Email address </label>
                    <input ref={email} type="email"
                        name="email"
                        className="form-control registerPass"
                        placeholder="Email address"
                        required />
                </fieldset>
                <fieldset className="confirmPassContainer">
                    <label htmlFor="inputPassword"> Password </label>
                    <input ref={password} type="password"
                        name="password"
                        className="form-control confirmPass"
                        placeholder="Password"
                        required />
                </fieldset>
                <fieldset className="confirmPassContainer">
                    <label htmlFor="verifyPassword"> Verify Password </label>
                    <input ref={verifyPassword} type="password"
                        name="verifyPassword"
                        className="form-control confirmPass"
                        placeholder="Verify password"
                        required />
                </fieldset>
                <fieldset className="pictureContainer">
                    <label htmlFor="file"> Profile Picture</label>
                    <input type="file"
                        name="file"
                        className="form-control profilePicture"
                        placeholder="upload a file"
                        onChange={uploadImage}
                        required />
                        {loading? (
                            <h3>Loading...</h3>
                        ): (
                            <img src={image} style={{width: '300px'}} />
                        )}
                </fieldset>

                <fieldset>
                    <button className="btn btn-primary registerButton" type="submit">
                        Sign in
                    </button>
                </fieldset>
            </form>
        </main>
    )
}

export default Register