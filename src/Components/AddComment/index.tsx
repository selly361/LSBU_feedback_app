import { useFeedbackContext } from 'Contexts';
import useUniqueUsername from 'Hooks/useUniqueUsername';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

function AddComment() {
  const { id } = useParams()
   
  const { addNewComment } = useFeedbackContext()
  const username = useUniqueUsername()

  const [commentContent, setCommentContent] = useState('')
  const maxCharacters = 250
  const [charactersLeft, setCharactersLeft] = useState(maxCharacters)

  useEffect(() => {
    setCharactersLeft(maxCharacters - commentContent.trim().length)
  }, [commentContent])

  const postComment = () => {
    if (charactersLeft === 0 || !commentContent.trim()) return


    const comment = {
        username,
        text: commentContent,
        replies: []
    }

    
    addNewComment(id as string, comment)
    setCommentContent('');
  }

  return (
    <fieldset className='add-comment'>
      <label className='add-comment__label'>Add Comment</label>
      <textarea
        className='form__textarea add-comment__textarea'
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        placeholder='Type your comment here'
      />
      <div className='add-comment__container'>
        <p className='add-comment__container__chars-left'>{charactersLeft} characters left</p>
        <button onClick={postComment} className='button--primary'>Post Comment</button>
      </div>
    </fieldset>
  )
}

export default AddComment