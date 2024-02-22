import { commentsLength } from 'Utils/commentsLength'
import { Comment as IComment } from 'Types' 
import Comment from './Comment'
import Reply from './Reply'


function Comments({ comments }: { comments: IComment[] }){ 

    const length = commentsLength(comments)

    return ( 
        <div className='comments'> 
            <h3 className='comments__length-of-comments'>{length} {length == 1 ? 'Comment' : 'Comments'}</h3>

            {comments.map((data) => (
            <div
                className={`comments__container ${data.replies.length ? 'comments__container--replies' : ''}`}
                key={data._id}
            >
                <Comment {...data}  />
                <div className='comments__reply-container'>
                    {data.replies?.map(reply => (
                        <Reply {...{...reply, commentId: data._id as string}} />
                    ))}
                </div>
            </div>
            ))}
        </div> 
    ) 
}

export default Comments