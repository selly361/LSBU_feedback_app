import { ReactionButton } from 'Components'
import { useLocation, useNavigate } from 'react-router-dom'
import { Feedback as IFeedback, Comment } from 'Types'
import { CommentsIcon } from 'Assets/Icons'
import { KeyboardEvent } from 'react'
import { useFeedbackContext } from 'Contexts'
import { commentsLength } from 'Utils/commentsLength'

function Feedback({
	_id,
	likes,
	dislikes,
	detail,
	title,
	comments,
	tutorial
}: IFeedback) {
	const navigate = useNavigate()
	const location = useLocation()
	const { tutorials } = useFeedbackContext()

	const handleClick = () => {
		if (location.pathname === '/') {
			navigate(`feedback/${_id}`)
		}
	}

	const handleKeyPress = (e: KeyboardEvent<HTMLAnchorElement>) => {
		if (e.key === 'Enter' && e.target === e.currentTarget) {
			if (location.pathname === '/') {
				navigate(`feedback/${_id}`)
			}
		}
	}

	const tutorialData = tutorials.find((t) => t._id === tutorial)

	return (
		<div
			className={`feedbacks__feedback ${
				location.pathname == '/' ? 'feedbacks__feedback--active' : ''
			}`}
		>
			<div className='feedbacks__feedback__container'>
				<ReactionButton {...{ likes, dislikes, feedbackId: _id }} />
				<a
					onKeyDown={(e: KeyboardEvent<HTMLAnchorElement>) => handleKeyPress(e)}
					onClick={handleClick}
					tabIndex={location.pathname == '/' ? 0 : -1}
					className='feedbacks__feedback__container__feedback-details'
				>
					<h3 className='feedbacks__feedback__container__feedback-details__title'>
						{title}
					</h3>
					<p className='feedbacks__feedback__container__feedback-details__desc'>
						{detail}
					</p>
					<div className='feedbacks__feedback__container__feedback-details__tutorial-tag'>{`${tutorialData?.name} - ${tutorialData?.lesson}`}</div>
				</a>
			</div>
			<div className='feedbacks__feedback__comments-length'>
				<CommentsIcon />
				<h5>{commentsLength(comments)}</h5>
			</div>
		</div>
	)
}

export default Feedback
