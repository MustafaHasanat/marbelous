"use client";

import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import React from "react";
import Logo from "@/public/images/marbelous-logo.png";
import Image from "next/image";
import { SharedText } from "@/components";

const GuestHeader = React.memo(() => {
    return (
        <header className="h-[70px] overflow-hidden py-2">
            <Navbar isBordered className="h-full flex items-center">
                <NavbarBrand>
                    <Image
                        src={Logo}
                        alt="logo"
                        className="w-[50px] h-[50px]"
                        width={100}
                        height={100}
                    />

                    <SharedText>
                        
                    </SharedText>
                </NavbarBrand>

                <NavbarContent className="flex items-center gap-2">
                    <NavbarItem>Integrations</NavbarItem>
                </NavbarContent>

                <NavbarContent justify="end">
                    <NavbarItem>
                        <Button color="primary" href="#" variant="flat">
                            Sign Up
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
        </header>
    );
});

export default GuestHeader;
