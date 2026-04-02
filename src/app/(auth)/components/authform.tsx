'use server'

import { loginAction, registerAction } from "../utils/actions";
import Button from "./button";
import InputForm from "./input";

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
            className="flex flex-col justify-center items-center w-[90%] md:w-4/6 lg:w-3/6 mx-auto my-10 p-8 shadow-blue-900 shadow-2xl rounded-2xl"
        >
            <InputForm id="username" name="username" type="text" placeholder="John Doe" />
            <InputForm id="email" name="email" type="email" placeholder="example@mail.com" />
            <InputForm id="password" name="password" type="password" placeholder="********" minLength={8} />
            <Button type={type.toUpperCase()} />
        </form>
    );
}