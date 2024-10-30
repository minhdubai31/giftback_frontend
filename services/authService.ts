import axios from 'axios';

export async function login(username: string, password: string) {
    const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password,
    });
    const token = response.data.data.token;
    localStorage.setItem('authToken', token); // Save the token into localStorage
    return token;
}
