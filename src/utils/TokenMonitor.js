import { isTokenExpired } from "@/utils/TokenUtils";
import router from "@/router";

function startTokenMonitor() {
    const interval = setInterval(() => {
        const token = localStorage.getItem("token");
        if (!token || isTokenExpired(token)) {
            clearInterval(interval); // Stop checking once token is expired
            logoutUser(); // Logout the user
        }
    }, 60000); // Check every 60 seconds
}

function logoutUser() {
    localStorage.removeItem("token"); // Clear token
    router.push({ name: "LoginPage" }); // Redirect to login page
}

export default startTokenMonitor;