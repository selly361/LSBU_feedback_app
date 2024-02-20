import { useParams } from 'react-router'

function FeedbackDetail() {

    const { id } = useParams()

  return (
    <main className='main--feedback-detail'>
        {id}
    </main>
  )
}

export default FeedbackDetail