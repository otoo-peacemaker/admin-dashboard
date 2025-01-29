import jwtDecode from "jwt-decode";

export function isTokenExpired(token) {
    if (!token) return true; // Treat missing token as expired
    try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000; // Convert milliseconds to seconds
        return decoded.exp < now; // Token is expired if current time is greater than `exp`
    } catch (err) {
        console.error("Invalid token", err);
        return true; // Treat invalid token as expired
    }
}