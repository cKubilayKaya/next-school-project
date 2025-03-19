"use client"; // Mutlaka en üstte olmalı
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const withAuth = (WrappedComponent) => {
  return function AuthComponent(props) {
    const { token } = useSelector((state) => state.auth);

    const router = useRouter();

    useEffect(() => {
      if (!token) {
        router.push("/auth/login");
      }
    }, [token, router]); // router bağımlılığını da ekledik

    if (!token) return null; // Token yoksa bileşeni göstermiyoruz

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
