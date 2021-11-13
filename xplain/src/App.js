/* eslint-disable no-unused-vars */
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";
import { Provider } from "react-redux";
import store from "./Components/Store/store";
import Routes from "./Routes";
import "./styles/CSS/style.css";

function App() {
	
	return (
		<Provider store={store}>
			<BrowserRouter>
				<NavigationBar />
				<Routes />
			</BrowserRouter>
		</Provider>
	);
}

export default App;
