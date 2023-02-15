import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

const LoginForm = () => {
    // Context
    const { loginUser } = useContext(AuthContext);

    // Two-way binding - Local State
    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    });
    const [alert, setAlert] = useState(null);

    const { username, password } = loginForm;

    const onChangeLoginForm = (event) =>
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

    //

    const login = async (event) => {
        event.preventDefault();

        try {
            const loginData = await loginUser(loginForm);
            console.log(loginData);
            if (!loginData.success) {
                setAlert({
                    type: "danger",
                    message: loginData.message,
                });
                setTimeout(() => setAlert(null), 5000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Form onSubmit={login}>
                <AlertMessage info={alert} />
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                        className="mt-3"
                        value={username}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        required
                        className="mt-3"
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </Form.Group>
                <Button variant="success" type="submit" className="mt-4">
                    Login
                </Button>
            </Form>
            <p className="mt-4">
                Don't have an account?
                <Link to="/register">
                    <Button variant="info" size="sm" className="ms-4">
                        Register
                    </Button>
                </Link>
            </p>
        </>
    );
};

export default LoginForm;
