"use client";

import React from "react";
import { Eye, EyeClosed } from "lucide-react";
import { Button, Input, Link, Form } from "@heroui/react";
import { Routs } from "@/lib/enums";
import { useInk } from "@kaiserleap/ink/react-ink";

const LoginPage = React.memo(() => {
    const [isVisible, setIsVisible] = React.useState(false);
    const { ink } = useInk();

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6">
                <p className="pb-4 text-left text-3xl font-semibold">
                    {ink("auth.login.welcome")}

                    <span aria-label="emoji" className="ml-2" role="img">
                        👋
                    </span>
                </p>

                <Form
                    className="flex flex-col gap-4"
                    validationBehavior="native"
                    onSubmit={handleSubmit}
                >
                    <Input
                        isRequired
                        label={ink("auth.login.email")}
                        labelPlacement="outside"
                        name="email"
                        type="email"
                        variant="bordered"
                    />
                    <Input
                        isRequired
                        endContent={
                            <button type="button" onClick={toggleVisibility}>
                                {isVisible ? <EyeClosed /> : <Eye />}
                            </button>
                        }
                        label={ink("auth.login.pass")}
                        labelPlacement="outside"
                        name="password"
                        type={isVisible ? "text" : "password"}
                        variant="bordered"
                    />
                    <Button className="w-full" color="primary" type="submit">
                        {ink("auth.login.btn")}
                    </Button>
                </Form>

                <p className="text-center text-small">
                    <Link href={Routs.REGISTER} size="sm">
                        {ink("auth.login.new")}
                    </Link>
                </p>
            </div>
        </div>
    );
});

export default LoginPage;
