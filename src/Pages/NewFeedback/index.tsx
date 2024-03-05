import { BackButton, Form, Loading } from 'Components'
import { useFeedbackContext } from 'Contexts'


function NewFeedback() {

  const { isLoading, tutorials } = useFeedbackContext()

  if(isLoading || tutorials.length === 0) {
    return (
      <main className='main--home'>
        <Loading />
      </main>
    )
  }

  return (
    <main className='main--new-feedback'>
        <BackButton />
        <Form />
    </main>
  )
}

export default NewFeedback
