import { Comment } from 'Types'

const commentsLength = (comments: Comment[]) => comments.reduce((prev, curr) => prev + (curr.replies.length || 0),comments.length)


export { commentsLength }
