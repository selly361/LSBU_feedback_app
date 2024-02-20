import { Arrow, ConfusedFace } from 'Assets/Icons'
import { Link } from 'react-router-dom'

function PageNotFound() {
	return (
		<main className='main--page-not-found'>
			<h1 className='main--page-not-found__title'>404</h1>
			<ConfusedFace />
			<Link className='main--page-not-found__return-home-link' to='/'>
				Go Back
			</Link>
		</main>
	)
}

export default PageNotFound
