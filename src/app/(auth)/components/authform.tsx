'use server'

import { loginAction, registerAction } from "../utils/actions";

import Button from "./button";
import InputForm from "./input";
import styles from "./authform.module.css";

export default async function AuthForm({ type }: { type: string }) {

    async function sendForm(form: FormData) {
        'use server'
        if (type === 'register') {
            await registerAction(form);
        } else {
            await loginAction(form);
        }
    }

    return (
        <form
            action={sendForm}
            className={styles.authFormContainer}
        >
            <InputForm id="username" name="username" type="text" placeholder="John Doe" />
            <InputForm id="email" name="email" type="email" placeholder="example@mail.com" />
            <InputForm id="password" name="password" type="password" placeholder="********" minLength={8} />
            <Button type={type.toUpperCase()} />
        </form>
    );
}