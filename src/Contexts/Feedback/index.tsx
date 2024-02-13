import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Feedback, Comment, Reply } from 'Types'
import * as api from 'API'

type FeedbackContextType = {
	feedbacks: Feedback[]
	handleLike: (feedbackId: string) => void
	handleDislike: (feedbackId: string) => void
	addNewComment: (feedbackId: string, commentData: Comment) => void
	addNewReply: (feedbackId: string, commentId: string, replyData: Reply) => void
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined)

export const useFeedbackContext = () => {
	const context = useContext(FeedbackContext)

	if (!context) {
		throw new Error('useFeedbackContext must be used within a FeedbackProvider')
	}

	return context
}

type FeedbackProviderProps = {
	children: ReactNode
}

export const FeedbackProvider = ({ children }: FeedbackProviderProps) => {
	const [feedbacks, setFeedbacks] = useState<Feedback[]>([])

	useEffect(() => {
		const fetchData = async () => {
			const data = await api.fetchFeedbacks()
			setFeedbacks(data)
		}

		fetchData()
	}, [])

	const handleLike = async (feedbackId: string) => {
		try {
			const updatedFeedback = await api.likeFeedback(feedbackId)
			updateFeedbackState(updatedFeedback)
		} catch (error) {
			console.error('Error liking feedback:', error)
		}
	}

	const handleDislike = async (feedbackId: string) => {
		try {
			const updatedFeedback = await api.dislikeFeedback(feedbackId)
			updateFeedbackState(updatedFeedback)
		} catch (error) {
			console.error('Error disliking feedback:', error)
		}
	}

    const addNewFeedback = async (feedbackData: Feedback) => {
        try {
            const newFeedback = await api.addFeedback(feedbackData)
            setFeedbacks(e => ([...e, newFeedback]))
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

	const addNewReply = async (feedbackId: string, commentId: string, replyData: Reply) => {
		try {
			const updatedFeedback = await api.addReply(feedbackId, commentId, replyData)
			updateFeedbackState(updatedFeedback)
		} catch (error) {
			console.error('Error adding reply:', error)
		}
	}

	const updateFeedbackState = (updatedFeedback: Feedback) => {
		const feedbackIndex = feedbacks.findIndex((f) => f._id === updatedFeedback._id)
		const updatedFeedbacks = [...feedbacks]
		updatedFeedbacks[feedbackIndex] = updatedFeedback
		setFeedbacks(updatedFeedbacks)
	}

	return (
		<FeedbackContext.Provider
			value={{
				feedbacks,
				handleLike,
				handleDislike,
				addNewComment,
				addNewReply
			}}
		>
			{children}
		</FeedbackContext.Provider>
	)
}
