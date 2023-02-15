import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

const RegisterForm = () => {
    // Context
    const { registerUser } = useContext(AuthContext);

    // Two-way binding - Local State
    const [registerForm, setRegisterForm] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });
    const [alert, setAlert] = useState(null);

    const { username, password, confirmPassword } = registerForm;

    const onChangeRegisterForm = (event) =>
        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value,
        });

    //

    const register = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setAlert({
                type: "danger",
                message: "Passwords do not match",
            });
            setTimeout(() => setAlert(null), 5000);
            return;
        }
        try {
            const registerData = await registerUser(registerForm);
            console.log(registerData);
            if (!registerData.success) {
                setAlert({
                    type: "danger",
                    message: registerData.message,
                });
                setTimeout(() => setAlert(null), 5000);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Form onSubmit={register}>
                <AlertMessage info={alert} />
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                        className="mt-3"
                        value={username}
                        onChange={onChangeRegisterForm}
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
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        required
                        className="mt-3"
                        value={confirmPassword}
                        onChange={onChangeRegisterForm}
                    />
                </Form.Group>
                <Button variant="success" type="submit" className="mt-4">
                    Register
                </Button>
            </Form>
            <p className="mt-4">
                Already have an account?
                <Link to="/login">
                    <Button variant="info" size="sm" className="ms-4">
                        Login
                    </Button>
                </Link>
            </p>
        </>
    );
};

export default RegisterForm;
