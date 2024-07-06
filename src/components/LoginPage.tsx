import { Button } from '@mui/material';
import styles from './CSS/Login.module.css';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const [phone, setPhone] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (username && phone && email) {
            const userDetails = { username, phone, email };
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
            navigate('/second');
        } else {
            alert('Please fill in all the fields.');
        }
    };

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value);
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username: </label> <br />
                        <input type="text" value={username} onChange={handleUsernameChange} />
                    </div>
                    <div>
                        <label>Phone number: </label> <br />
                        <input type="text" value={phone} onChange={handlePhoneChange} />
                    </div>
                    <div>
                        <label>Email: </label> <br />
                        <input type="email" value={email} onChange={handleEmailChange} />
                    </div>
                    <Button variant="contained" type="submit" sx={{ backgroundColor: "#42A5F5", color: "white" }}>Submit</Button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
