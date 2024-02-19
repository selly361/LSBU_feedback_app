import { Comment, Feedback, Reply, Tutorial } from 'Types'

const API_URL = 'http://localhost:3001'

const fetchFeedbacks = async (): Promise<Feedback[]> => {
	try {
		const response = await fetch(`${API_URL}/feedbacks`)
		const data: Feedback[] = await response.json()
		return data
	} catch (error) {
		console.error('Error fetching feedbacks:', error)
		throw error
	}
}

const fetchTutorials = async (): Promise<Tutorial[]> => {
	try {
		const response = await fetch(`${API_URL}/tutorials`)
		const data: Tutorial[] = await response.json()
		return data
	} catch (error) {
		console.error('Error fetching tutorials:', error)
		throw error
	}
}

export interface IFeedbackData {
	title: string
	detail: string
	tutorial?: string
}

const addFeedback = async (
	feedbackData: IFeedbackData
): Promise<IFeedbackData> => {
	try {
		const response = await fetch(`${API_URL}/feedbacks`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(feedbackData)
		})
		const data: Feedback = await response.json()
		return data
	} catch (error) {
		console.error('Error adding feedback:', error)
		throw error
	}
}

const likeFeedback = async (
	feedbackId: string,
	username: string
): Promise<Feedback> => {
	try {
		const response = await fetch(`${API_URL}/feedbacks/${feedbackId}/like`, {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'PUT',
			body: JSON.stringify({ username })
		})
		const data: Feedback = await response.json()
		return data
	} catch (error) {
		console.error('Error liking feedback:', error)
		throw error
	}
}

const dislikeFeedback = async (
	feedbackId: string,
	username: string
): Promise<Feedback> => {
	try {
		const response = await fetch(`${API_URL}/feedbacks/${feedbackId}/dislike`, {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'PUT',
			body: JSON.stringify({ username })
		})
		const data: Feedback = await response.json()
		return data
	} catch (error) {
		console.error('Error disliking feedback:', error)
		throw error
	}
}

const addComment = async (
	feedbackId: string,
	commentData: Comment
): Promise<Feedback> => {
	try {
		const response = await fetch(`${API_URL}/feedbacks/${feedbackId}/comment`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(commentData)
		})
		const data: Feedback = await response.json()
		return data
	} catch (error) {
		console.error('Error adding comment:', error)
		throw error
	}
}

const addReply = async (
	feedbackId: string,
	commentId: string,
	replyData: Reply
): Promise<Feedback> => {
	try {
		const response = await fetch(
			`${API_URL}/feedbacks/${feedbackId}/comment/${commentId}/reply`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(replyData)
			}
		)
		const data: Feedback = await response.json()
		return data
	} catch (error) {
		console.error('Error adding reply:', error)
		throw error
	}
}

export {
	fetchFeedbacks,
	fetchTutorials,
	addFeedback,
	likeFeedback,
	dislikeFeedback,
	addComment,
	addReply
}
