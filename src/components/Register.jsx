import React, { useState } from 'react';
import * as yup from 'yup';
import '../App.css';

const schema = yup.object().shape({
    username: yup.string().required('El nombre de usuario es obligatorio'),
    password: yup.string().required('La contraseña es obligatoria'),
});

const Register = ({ switchView, addAccount }) => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});
    const [registerMessage, setRegisterMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await schema.validate(formData, { abortEarly: false });
            setErrors({});
            addAccount(formData);
            setRegisterMessage('Registro exitoso');
            setTimeout(() => switchView('login'), 2000);
        } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
                validationErrors[error.path] = error.message;
            });
            setErrors(validationErrors);
            setRegisterMessage('');
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
            <button type="submit">Registrar</button>
            {registerMessage && <p>{registerMessage}</p>}
            <button type="button" onClick={() => switchView('login')}>
                Volver al Login
            </button>
        </form>
    );
};

export default Register;


