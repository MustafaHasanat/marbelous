"use client";

import React from "react";
import { Eye, EyeClosed } from "lucide-react";
import { Button, Input, Checkbox, Link, Form } from "@nextui-org/react";
import { Routs } from "@/lib/enums";

const LoginPage = React.memo(() => {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("handleSubmit");
    };

    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6">
                <p className="pb-4 text-left text-3xl font-semibold">
                    Log In
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
                        label="Email"
                        labelPlacement="outside"
                        name="email"
                        placeholder="Enter your email"
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
                        label="Password"
                        labelPlacement="outside"
                        name="password"
                        placeholder="Enter your password"
                        type={isVisible ? "text" : "password"}
                        variant="bordered"
                    />
                    <div className="flex w-full items-center justify-between px-1 py-2">
                        <Checkbox defaultSelected name="remember" size="sm">
                            Remember me
                        </Checkbox>
                        <Link className="text-default-500" href="#" size="sm">
                            Forgot password?
                        </Link>
                    </div>
                    <Button className="w-full" color="primary" type="submit">
                        Log In
                    </Button>
                </Form>
                <p className="text-center text-small">
                    <Link href={Routs.REGISTER} size="sm">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
});

export default LoginPage;
