import { Arrow, ConfusedFace } from 'Assets/Icons'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {
	const navigate = useNavigate()
	return (
		<main className='main--page-not-found'>
			<h1 className='main--page-not-found__title'>404</h1>
			<ConfusedFace />
			<button className='button--cancel' onClick={() => navigate(-1)}>Cancel</button>
		</main>
	)
}

export default PageNotFound
