"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthLayout = ({ children ,role}) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if (!token) {
            router.replace("/login"); // `replace` prevents history stacking
            return;
        }

        try {
            const parsedUser = JSON.parse(user);
            console.log(parsedUser.role);
            if (!parsedUser || parsedUser.role !== role) {
                router.replace("/");
                return;
            }
        } catch (error) {
            console.error("Error parsing user data:", error);
            router.replace("/login");
            return;
        }

        setLoading(false);
    }, [router]);

    if (loading) return <p>Loading...</p>;

    return <>{children}</>;
};

export default AuthLayout;
