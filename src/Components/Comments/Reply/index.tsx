import { Reply as IReply } from 'Types'
import { useState } from 'react'
import useUniqueUsername from 'Hooks/useUniqueUsername'
import { PersonIcon } from 'Assets/Icons'
import AddReply from '../AddReply'

interface IReplyProps extends IReply {
  commentId: string
}
  
  function Reply({ text, replyingTo, username: replyUsername, commentId }: IReplyProps) {
    const [reply, setReply] = useState(false)
    const usersUsername = useUniqueUsername()
  
    return (
      <section className={`comments__comment comments__reply`}>
        <PersonIcon />
        <div className='comments__comment__container'>
          <div className='comments__comment__container__sub-container'>
            <h4 className='comments__username'>{replyUsername} {usersUsername === replyUsername ? '(You)' : ''}</h4>
          </div>
          <button className='comments__reply-button' onClick={() => setReply((e) => !e)}>Reply</button>
          <p className='comments__text'>
            <span className='comments__reply__replying-to'>{`@${replyingTo} `}</span>
            {text}
          </p>
          {reply ? <AddReply closeReply={() => setReply(false)} commentId={commentId} replyingTo={replyUsername} /> : null}
        </div>
      </section>
    )
  }
  
  export default Reply