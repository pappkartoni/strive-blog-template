import React, { useState } from "react"
import { Button, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
const LandingPage = (props) => {
    const navigate = useNavigate()
    const [loginOrRegister, setLoginOrRegister] = useState("")
    const [email, setEmail] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")

    const login = async (e) => {
        e.preventDefault()
        console.log(email, password1)
        try {
            const apiUrl = process.env.REACT_APP_BE_DEV_URL
            const res = await fetch(`${apiUrl}/authors/login`, {
                method: "POST",
                body: JSON.stringify({email: email, password: password1}),
                headers: new Headers({
                  "Content-Type": "application/json"
                })
            })

            if (res.ok) {
                const {accessToken} = await res.json()
                window.localStorage.setItem("token", accessToken)
                console.log(accessToken)
                navigate("/home")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const register = async (e) => {
        e.preventDefault()
        try {
            if (password1 === password2) {
                const apiUrl = process.env.REACT_APP_BE_DEV_URL
                const res = await fetch(`${apiUrl}/authors/register`, {
                    method: "POST",
                    body: JSON.stringify({email: email, password: password1, name: name, surname: surname}),
                    headers: new Headers({
                      "Content-Type": "application/json"
                    })
                })
    
                if (res.ok) {
                    await login()
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container className="mt-5">
            <h1>Strive Blog Landing Page</h1>
            <Row className="mt-5 justify-content-center">
                <Button onClick={() => setLoginOrRegister("login")} style={{maxWidth: 200}}>Log In</Button>
                <Button onClick={() => setLoginOrRegister("register")} style={{maxWidth: 200, marginLeft: 20}}>Register</Button>
            </Row>
            {loginOrRegister === "login" &&
            <Form>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control required placeholder="Email" onChange={e => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" placeholder="Password" onChange={e => setPassword1(e.target.value)}></Form.Control>
                </Form.Group>
                <Button className="mt-3" type="submit" onClick={login}>Login</Button>
            </Form>}
            {loginOrRegister === "register" &&
            <Form>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control required placeholder="Email" onChange={e => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" placeholder="Password" onChange={e => setPassword1(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control required type="password" placeholder="Password" onChange={e => setPassword2(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control required placeholder="Name" onChange={e => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Surname</Form.Label>
                    <Form.Control required placeholder="Surname" onChange={e => setSurname(e.target.value)}></Form.Control>
                </Form.Group>
                <Button className="mt-3" type="submit" onClick={register}>Register</Button>
            </Form>}
        </Container>
    )
}

export default LandingPage