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
            sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
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
                <h1 style={{fontWeight:"600",color:"white"}}>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label style={{color:"white"}}>Username: </label> <br />
                        <input type="text" value={username} onChange={handleUsernameChange} />
                    </div>
                    <div>
                        <label style={{color:"white"}}>Phone number: </label> <br />
                        <input type="text" value={phone} onChange={handlePhoneChange} />
                    </div>
                    <div>
                        <label style={{color:"white"}}>Email: </label> <br />
                        <input type="email" value={email} onChange={handleEmailChange} />
                    </div>
                    <Button variant="contained" type="submit" sx={{ backgroundColor: "#052946", color: "white" ,borderRadius:"10px"}}>Submit</Button>
                </form>
            </div>
            <p>Kindly note the login data is stored in session storage ,once the application is closed please login again ,and cannot be redirected to login page once logged in ,if wanted to check login page please close and reopen the link</p>
        </div>
    );
}

export default LoginPage;
