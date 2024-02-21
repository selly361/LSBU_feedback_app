import { ArrowDownIcon, ArrowUpIcon } from 'Assets/Icons'
import { useFeedbackContext } from 'Contexts/Feedback';
import useUniqueUsername from 'Hooks/useUniqueUsername'
import { MouseEvent } from 'react'

interface IProps {
	likes: { count: number; users: string[] }
	dislikes: { count: number; users: string[] }
    feedbackId: string | undefined
}

function ReactionButton({ likes, dislikes, feedbackId }: IProps) {
	const userName = useUniqueUsername()

    const activeLike = likes.users.includes(userName)
    const activeDislike = dislikes.users.includes(userName)


    const { handleLike, handleDislike } = useFeedbackContext()

	return (
		<div className='reaction-button'>
			<button onClick={() => handleLike(feedbackId as string)} className={`reaction-button__like ${activeLike ? 'reaction-button__like--active' : ''}`}>
				<ArrowUpIcon  />
			</button>
			{likes.count - dislikes.count}
			<button onClick={() => handleDislike(feedbackId as string)} className={`reaction-button__dislike ${activeDislike ? 'reaction-button__dislike--active' : ''}`}>
				<ArrowDownIcon />
			</button>
		</div>
	)
}

export default ReactionButton
