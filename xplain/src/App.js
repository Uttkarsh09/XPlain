/* eslint-disable no-unused-vars */
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";
import { Provider } from "react-redux";
import store from "./Components/Store/store";
import Routes from "./Routes";
import "./styles/CSS/style.css";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dotenv from "dotenv";
dotenv.config();

function App() {
	return (
		<>
			<Provider store={store}>
				<BrowserRouter>
					<NavigationBar />
					<Routes style={{ zIndex: 5 }} />
				</BrowserRouter>
				<ToastContainer
					position="top-center"
					autoClose="2000"
					transition={Slide}
					pauseOnHover={true}
				/>
			</Provider>
		</>
	);
}

export default App;
