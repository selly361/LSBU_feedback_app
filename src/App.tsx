import { FeedbackDetail, Home, NewFeedback, PageNotFound } from 'Pages'
import { Fragment } from 'react'
import { Routes, Route } from 'react-router-dom'

function App() {
	return (
		<Fragment>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/new' element={<NewFeedback />} />
				<Route path='/feedback/:id' element={<FeedbackDetail />} />
				<Route path='*' element={<PageNotFound />} />
			</Routes>
		</Fragment>
	)
}

export default App
