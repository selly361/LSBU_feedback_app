import { useFeedbackContext } from 'Contexts' 
import PageNotFound from 'Pages/PageNotFound' 
import { useParams } from 'react-router' 
import { useLocation } from 'react-router-dom' 
import { AddComment, BackButton, Comments } from 'Components' 
import Feedback from 'Components/Feedbacks/Feedback' 

function FeedbackDetail() { 
  const { id } = useParams() 
  const location = useLocation() 
  const { feedbacks } = useFeedbackContext() 
  const indexOfFeedback = feedbacks.findIndex(feedback => feedback._id === id)
  
  if(indexOfFeedback === -1){ 
    return <PageNotFound /> 
  } 
  
  const feedbackData = feedbacks[indexOfFeedback]
  
  return (
  <main className='main--feedback-detail'> 
      <BackButton /> 
      <Feedback {...feedbackData} /> 
      <Comments comments={feedbackData.comments} />
      <AddComment />
  </main> 
  ) 


} 



export default FeedbackDetail