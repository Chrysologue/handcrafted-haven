import styles from "./register.module.css"
import { checkUsers } from "@/lib/db";

export default function userRegistration() {
    return (
        <section className={styles.registrationFormContainer}>
        <h1>User Registration</h1>
        <p>Please fill out the form below to create an account.</p>
        <form action="/api/users" method="POST"> 
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
            </div>
            <button type="submit">Register</button>
        </form>
        </section>
    )
}