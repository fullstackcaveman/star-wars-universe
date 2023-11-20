import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './styles/main.css';
import App from './App';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
	<Provider store={store}>
		<Router>
			<App tab='home' />
		</Router>
	</Provider>
);
