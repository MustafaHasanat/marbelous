"use client";

import React from "react";
import { Button, Input, Link } from "@heroui/react";
import { Eye, EyeClosed } from "lucide-react";
import { Routs } from "@/lib/enums";
import { useInk } from "@kaiserleap/ink/react-ink";

const RegisterPage = React.memo(() => {
    const [isVisible, setIsVisible] = React.useState(false);
    const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);
    const { ink } = useInk();

    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="flex w-full max-w-sm flex-col gap-4 rounded-large px-8 pb-10 pt-6">
                <p className="pb-4 text-left text-3xl font-semibold">
                    {ink("auth.register.welcome")}
                    <span aria-label="emoji" className="ml-2" role="img">
                        👋
                    </span>
                </p>
                <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                    <Input
                        isRequired
                        label={ink("auth.register.name")}
                        labelPlacement="outside"
                        name="username"
                        type="text"
                        variant="bordered"
                    />
                    <Input
                        isRequired
                        label={ink("auth.register.email")}
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
                        label={ink("auth.register.pass")}
                        labelPlacement="outside"
                        name="password"
                        type={isVisible ? "text" : "password"}
                        variant="bordered"
                    />
                    <Input
                        isRequired
                        endContent={
                            <button type="button" onClick={toggleConfirmVisibility}>
                                {isConfirmVisible ? <EyeClosed /> : <Eye />}
                            </button>
                        }
                        label={ink("auth.register.confirm")}
                        labelPlacement="outside"
                        name="confirmPassword"
                        type={isConfirmVisible ? "text" : "password"}
                        variant="bordered"
                    />
                    <Button color="primary" type="submit">
                        {ink("auth.register.btn")}
                    </Button>
                </form>
                <p className="text-center text-small">
                    <Link href={Routs.LOGIN} size="sm">
                        {ink("auth.register.old")}
                    </Link>
                </p>
            </div>
        </div>
    );
});

export default RegisterPage;
