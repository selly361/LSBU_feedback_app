import { CheckIcon } from 'Assets/Icons'
import { useFilterFeedbackContext } from 'Contexts'

function FilterDropDown() {
	const { filter, setFilter } = useFilterFeedbackContext()
	const check = (preference: string) => preference === filter ? <CheckIcon /> : null

	return (
		<div className='filter-dropdown'>
			<button className='filter-dropdown__button' onClick={() => setFilter('Most Upvotes')}>
				<h5 className='filter-dropdown__button__text'>Most Upvotes</h5>
				{check('Most Upvotes')}
			</button>

			<button className='filter-dropdown__button' onClick={() => setFilter('Least Upvotes')}>
				<h5 className='filter-dropdown__button__text'>Least Upvotes</h5>
				{check('Least Upvotes')}
			</button>

			<button className='filter-dropdown__button' onClick={() => setFilter('Most Comments')}>
				<h5 className='filter-dropdown__button__text'>Most Comments</h5>
				{check('Most Comments')}
			</button>

			<button className='filter-dropdown__button' onClick={() => setFilter('Least Comments')}>
				<h5 className='filter-dropdown__button__text'>Least Comments</h5>
				{check('Least Comments')}
			</button>
		</div>
	)
}

export default FilterDropDown
