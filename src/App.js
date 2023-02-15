// theme bootstrap default
// import "bootstrap/dist/css/bootstrap.min.css";
// theme custom in bootswatch
import "./assets/minty-bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/layout/Landing";
import Auth from "./views/Auth";
import AuthContextProvider from "./contexts/AuthContext";
import Dashboard from "./views/Dashboard";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import About from "./views/About";
import PostContextProvider from "./contexts/PostContext";

function App() {
    return (
        <AuthContextProvider>
            <PostContextProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route
                            path="/login"
                            element={<Auth authRoute="login" />}
                        />
                        <Route
                            path="/register"
                            element={<Auth authRoute="register" />}
                        />
                        <Route path="/dashboard" element={<ProtectedRoute />}>
                            <Route path="" element={<Dashboard />} />
                        </Route>
                        <Route path="/about" element={<ProtectedRoute />}>
                            <Route path="" element={<About />} />
                        </Route>
                    </Routes>
                </Router>
            </PostContextProvider>
        </AuthContextProvider>
    );
}

export default App;
