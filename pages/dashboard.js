import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [role, setRole] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");

    if (!storedRole) {
      router.push("/");
    } else {
      setRole(storedRole);
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {role === "admin" ? (
        <p>Welcome Admin! Here is your admin dashboard.</p>
      ) : (
        <p>Welcome User! Here is your user dashboard.</p>
      )}
    </div>
  );
}
