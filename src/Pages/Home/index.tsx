import { FeedbackHeader, Loading } from 'Components'
import Feedbacks from 'Components/Feedbacks'
import NoFeedbacksMessage from 'Components/NoFeedbacksMessage'
import { useFeedbackContext } from 'Contexts'
import React from 'react'

function Home() {
	const { isLoading, feedbacks } = useFeedbackContext()

	const Component = isLoading ? (
		<Loading />
	) : feedbacks.length === 0 ? (
		<NoFeedbacksMessage />
	) : (
		<Feedbacks />
	)

	return (
		<main className='main--home'>
			<section className='main--home__main-section'>
				<FeedbackHeader />
				<div className='main--home__main-section__container'>{Component}</div>
			</section>
		</main>
	)
}

export default Home
