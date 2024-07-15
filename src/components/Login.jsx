
import React, { useState } from 'react';
import * as yup from 'yup';
import '../App.css'; //


////
////      Username = admin
////      Password = admin
////


const schema = yup.object().shape({
    username: yup.string().required('El nombre de usuario es obligatorio'),
    password: yup.string().required('La contraseña es obligatoria'),
});

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});
    const [loginMessage, setLoginMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await schema.validate(formData, { abortEarly: false });
            setErrors({});

            // Validación simple sin DB
            if (formData.username === 'admin' && formData.password === 'admin') {
                setLoginMessage('Login exitoso');
            } else {
                setLoginMessage('Nombre de usuario o contraseña incorrectos');
            }
        } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
                validationErrors[error.path] = error.message;
            });
            setErrors(validationErrors);
            setLoginMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Nombre de usuario:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                {errors.username && <p>{errors.username}</p>}
            </div>
            <div>
                <label htmlFor="password">Contraseña:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <p>{errors.password}</p>}
            </div>
            <button type="submit">Login</button>
            {loginMessage && <p>{loginMessage}</p>}
        </form>
    );
};

export default Login;
