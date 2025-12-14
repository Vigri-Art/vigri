import { signup } from './actions';

export default function SignupPage() {
    return (
        <form action={signup}>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required />
            <br></br>
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required />
            <br></br>
            <button type="submit">Sign Up</button>
            <br></br>
            <br></br>
            <p>Already have an account? <a href="/login">Log in here.</a></p>
        </form>
    );
}