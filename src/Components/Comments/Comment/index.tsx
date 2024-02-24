import { Comment as IComment } from 'Types'
import { useState } from "react";
import useUniqueUsername from "Hooks/useUniqueUsername";
import { PersonIcon } from 'Assets/Icons';
import AddReply from '../AddReply';

  
  function Comment({ _id, text, username: commentsUsername }: IComment) {
    const usersUsername = useUniqueUsername()
    const [reply, setReply] = useState(false)

    return (
      <section className={`comments__comment`}>
        <PersonIcon />
        <div className='comments__comment__container'>
          <div className='comments__comment__container__sub-container'>
            <h4 className='comments__username'>{commentsUsername} {usersUsername === commentsUsername ? '(You)' : ''}</h4>
          </div>
          <button className='comments__reply-button' onClick={() => setReply((e) => !e)}>Reply</button>
          <p className='comments__text'>
            {text}
          </p>
          {reply ? <AddReply closeReply={() => setReply(false)} commentId={_id as string} replyingTo={commentsUsername} /> : null}
        </div>
      </section>
    )
  }
  
  export default Comment