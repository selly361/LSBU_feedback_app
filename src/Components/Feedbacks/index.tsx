import { useFeedbackContext } from 'Contexts'
import Feedback from './Feedback'

function Feedbacks() {

  const { feedbacks } = useFeedbackContext()

  return (
    <div className='feedbacks'>
        {feedbacks.map(feedbackData => <Feedback {...feedbackData} />)}
    </div>
  )
}

export default Feedbacks