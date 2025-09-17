import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Dashboard.module.css";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TabContent from "../components/TabContent";

export default function Dashboard() {
  const [role, setRole] = useState("");
  const [allowedTabs, setAllowedTabs] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") || "";
    const storedTabs = JSON.parse(localStorage.getItem("allowedTabs") || "[]");
    const userUid = localStorage.getItem("userUid") || "";
    const email = localStorage.getItem("userEmail") || "";

    if (!storedRole || storedTabs.length === 0 || !userUid) {
      router.push("/");
      return;
    }

    setRole(storedRole);
    setAllowedTabs(storedTabs);
    setUserEmail(email);
    if (storedTabs.length > 0) setActiveTab(storedTabs[0]);
    setLoading(false);
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <Header userEmail={userEmail} />

      <div className={styles.mainContent}>
        <Sidebar
          allowedTabs={allowedTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <main className={styles.mainPanel}>
          <TabContent activeTab={activeTab} />
        </main>
      </div>

      <Footer />
    </div>
  );
}
