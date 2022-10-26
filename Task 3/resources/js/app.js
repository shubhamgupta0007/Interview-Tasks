import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditUserList from "./screens/EditUserList";
import UserListDetails from ".//screens/UserListDetails";
import "./bootstrap";
import ReactDOM from "react-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserListDetails />}></Route>
                <Route path="/edituser/:id" element={<EditUserList />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

if (document.getElementById("example")) {
    ReactDOM.render(<App />, document.getElementById("example"));
}
