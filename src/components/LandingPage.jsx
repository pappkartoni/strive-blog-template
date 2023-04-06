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
                <Button onClick={() => setLoginOrRegister("register")} style={{width: 220}}>Register</Button>
                <Button onClick={() => setLoginOrRegister("login")} style={{width: 220, marginInline: 20}}>Log In</Button>
                <a href="http://localhost:3420/authors/google" style={{display: "block", width: 220, padding: 0}}>
                    <Button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google mx-2" viewBox="0 0 16 16">
                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                        </svg>
                        Log In with Google
                    </Button>
                </a>
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