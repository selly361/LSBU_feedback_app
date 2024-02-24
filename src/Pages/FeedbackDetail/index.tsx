import { useFeedbackContext } from 'Contexts' 
import PageNotFound from 'Pages/PageNotFound' 
import { useParams } from 'react-router' 
import { useLocation } from 'react-router-dom' 
import { AddComment, BackButton, Comments, Loading } from 'Components' 
import Feedback from 'Components/Feedbacks/Feedback' 

function FeedbackDetail() { 
  const { id } = useParams() 
  const { feedbacks, isLoading } = useFeedbackContext() 
  const indexOfFeedback = feedbacks.findIndex(feedback => feedback._id === id)

  
  if(isLoading){
    return <main className='main--home'><Loading /></main>
  }


  else if(indexOfFeedback === -1 && !isLoading){ 
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