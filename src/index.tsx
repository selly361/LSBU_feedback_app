import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { FeedbackProvider, FilterFeedbackProvider } from 'Contexts'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<FeedbackProvider>
				<FilterFeedbackProvider>
					<App />
				</FilterFeedbackProvider>
			</FeedbackProvider>
		</BrowserRouter>
	</React.StrictMode>
)

reportWebVitals()
