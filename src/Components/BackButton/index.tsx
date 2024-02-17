import { ArrowLeftIcon } from 'Assets/Icons'
import { useNavigate } from 'react-router-dom'

function BackButton() {

    const navigate = useNavigate()
    
  return (
    <button className='back-button' onClick={() => navigate(-1)}>
        <ArrowLeftIcon />
        Go Back
    </button>
  )
}

export default BackButton