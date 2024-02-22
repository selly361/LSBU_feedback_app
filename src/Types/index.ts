export interface Feedback {
	_id?: string
	title: string
	detail: string
	likes: {
		count: number
		users: string[]
	}
    tutorial: string
	dislikes: {
		count: number
		users: string[]
	}
	comments: Comment[]
}

export interface Comment {
	_id?: string
	username: string
	text: string
	replies: Reply[]
}

export interface Reply {
	_id?: string
	username: string
	text: string
	replyingTo: string
}

export interface Tutorial {
	_id?: string
	name: string
    lesson: string
}
