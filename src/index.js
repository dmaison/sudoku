import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import App from './components/Layout';
import reducer from './redux'
import reportWebVitals from './reportWebVitals';

const enhancers = compose(
	applyMiddleware( ...[ ReduxThunk ]),
	window.devToolsExtension ? window.devToolsExtension() : f => f
),
store = configureStore({
	reducer,
	enhancers
}),
root = createRoot( document.getElementById( 'root' ) );
root.render(
  	<StrictMode>
		<Provider store={ store }>
			<App />
		</Provider>
  	</StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();