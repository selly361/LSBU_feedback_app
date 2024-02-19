import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode
} from 'react'
import { Feedback, Comment, Reply, Tutorial } from 'Types'
import * as api from 'API'
import useUniqueUsername from 'Hooks/useUniqueUsername'

interface IFeedbackContext {
	feedbacks: Feedback[]
	tutorials: Tutorial[]
	handleLike: (feedbackId: string) => void
	handleDislike: (feedbackId: string) => void
	addNewComment: (feedbackId: string, commentData: Comment) => void
	addNewReply: (feedbackId: string, commentId: string, replyData: Reply) => void
	addNewFeedback: (feedbackData: api.IFeedbackData) => void
	isLoading: boolean,
	setFeedbacks: React.Dispatch<React.SetStateAction<Feedback[]>>
}

const FeedbackContext = createContext<IFeedbackContext | undefined>(undefined)

const useFeedbackContext = () => {
	const context = useContext(FeedbackContext)

	if (!context) throw new Error('useFeedbackContext must be used within a FeedbackProvider')

	return context
}

interface IProps {
	children: ReactNode
}

function FeedbackProvider({ children }: IProps) {
	const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
	const [tutorials, setTutorials] = useState<Tutorial[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const username = useUniqueUsername()

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true)
			try {
				const [feedbacksData, tutorialsData] = await Promise.all([
					api.fetchFeedbacks(),
					api.fetchTutorials()
				])
				setFeedbacks(feedbacksData)
				setTutorials(tutorialsData) 
			} catch (error) {
				console.error('Error fetching data:', error)
			}

			finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	const handleLike = async (feedbackId: string) => {
		try {
			const updatedFeedback = await api.likeFeedback(feedbackId, username)
			updateFeedbackState(updatedFeedback)
		} catch (error) {
			console.error('Error liking feedback:', error)
		}
	}

	const handleDislike = async (feedbackId: string) => {
		try {
			const updatedFeedback = await api.dislikeFeedback(feedbackId, username)
			updateFeedbackState(updatedFeedback)
		} catch (error) {
			console.error('Error disliking feedback:', error)
		}
	}

	const addNewFeedback = async (feedbackData: api.IFeedbackData) => {
		try {
			const newFeedback = (await api.addFeedback(feedbackData)) as Feedback
			setFeedbacks((e) => [...e, newFeedback])
		} catch (error) {
			console.error('Error adding feedback:', error)
		}
	}

	const addNewComment = async (feedbackId: string, commentData: Comment) => {
		try {
			const updatedFeedback = await api.addComment(feedbackId, commentData)
			updateFeedbackState(updatedFeedback)
		} catch (error) {
			console.error('Error adding comment:', error)
		}
	}

	const addNewReply = async (
		feedbackId: string,
		commentId: string,
		replyData: Reply
	) => {
		try {
			const updatedFeedback = await api.addReply(
				feedbackId,
				commentId,
				replyData
			)
			updateFeedbackState(updatedFeedback)
		} catch (error) {
			console.error('Error adding reply:', error)
		}
	}

	const updateFeedbackState = (updatedFeedback: Feedback) => {
		const feedbackIndex = feedbacks.findIndex(
			(f) => f._id === updatedFeedback._id
		)
		const updatedFeedbacks = [...feedbacks]
		updatedFeedbacks[feedbackIndex] = updatedFeedback
		setFeedbacks(updatedFeedbacks)
	}

	return (
		<FeedbackContext.Provider
			value={{
				feedbacks,
				tutorials,
				handleLike,
				handleDislike,
				addNewComment,
				addNewReply,
				addNewFeedback,
				isLoading,
				setFeedbacks
			}}
		>
			{children}
		</FeedbackContext.Provider>
	)
}


export default FeedbackProvider
export { useFeedbackContext }