"use client";

import { ReactNode } from "react";
import React from "react";

interface Props {
    children: ReactNode;
}

export const AuthGuard = ({ children }: Props) => {
    return <>{children}</>;
};
