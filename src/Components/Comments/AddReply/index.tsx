import { useFeedbackContext } from "Contexts";
import useUniqueUsername from "Hooks/useUniqueUsername";
import { Reply } from "Types"
import { ChangeEvent, useState } from "react"
import { useParams } from "react-router-dom";

interface IAddReplyProps {
  commentId: string;
  replyingTo: string;
  closeReply: () => void
}

function AddReply({ closeReply, replyingTo, commentId }: IAddReplyProps) {

    const { id } = useParams();
    const { addNewReply } = useFeedbackContext()
    const username = useUniqueUsername()
    const [content, setContent] = useState("");


    const postReply = () => {

      const newReply = {
        username,
        text: content,
        replyingTo
      }
      
      addNewReply(id as string, commentId, newReply)
      setContent('')
      closeReply()
    }

  return (
    <div className='add-reply'>
      <textarea
        className='form__textarea add-reply__textarea'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className='button--primary' onClick={postReply}>Post Reply</button>
    </div>
  )
}

export default AddReply