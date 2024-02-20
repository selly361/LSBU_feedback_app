import { EmptyIllustration } from 'Assets/Icons'
import { Link } from 'react-router-dom'

function NoFeedbacksMessage() {
	return (
		<div className='no-feedbacks-message'>
			<EmptyIllustration />
			<article className='no-feedbacks-message__article'>
				<h3 className='no-feedbacks-message__article__title'>There is no feedback yet.</h3>
				<p className='no-feedbacks-message__article__desc'>
					Got a suggestion? Found a bug that needs to be squashed? We love
					hearing about new ideas to improve our app.
				</p>
			</article>
			<Link to='/new'>
				<button className='button--primary'>+ Add Feedback</button>
			</Link>
		</div>
	)
}

export default NoFeedbacksMessage
