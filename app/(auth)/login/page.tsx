import { login } from './actions';

export default function LoginPage() {
    return (
        <form action={login}>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required />
            <br></br>
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required />
            <br></br>
            <button type="submit">Log In</button>
            <br></br>
            <br></br>
            <p><a href="/forgot-password">Forgot your password?</a></p>
            <br></br>
            <br></br>
            <p>Don't have an account? <a href="/signup">Sign up here.</a></p>
        </form>
    );
}