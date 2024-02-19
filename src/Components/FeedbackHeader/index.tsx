import FilterDropDown from './FilterDropDown'
import { ArrowDownIcon, FeedbacksIcon } from 'Assets/Icons'
import { useFeedbackContext, useFilterFeedbackContext } from 'Contexts'
import { Link } from 'react-router-dom'

function FeedbackHeader() {
	const { filter, modalRef, setToggle, toggle } = useFilterFeedbackContext()
	const { feedbacks } = useFeedbackContext()

	return (
		<section className='feedback-header'>
			<div className='feedback-header__container'>
				<FeedbacksIcon />
				<h3 className='feedback-header__container__number-of-feedbacks'>{feedbacks.length} {feedbacks.length === 1 ? 'Feedback' : 'Feedbacks'}</h3>
			</div>
			<button
				onClick={() => setToggle((e) => !e)}
				ref={modalRef}
				className={`feedback-header__sort-button ${toggle ? 'feedback-header__sort-button--active' : ''}`}
			>
				<h4 className='feedback-header__sort-button__text'>Sort by : </h4>
				<h4 className='feedback-header__sort-button__sort-text'>
					{filter}{' '}
					<ArrowDownIcon className={`feedback-header__sort-button__arrow${toggle ? '--active' : ''}`} />
				</h4>
				{toggle ? <FilterDropDown /> : null}
			</button>
			<Link className='feedback-header__add-feedback-link' to='/new'>
				<button className='button--primary'>+ Add Feedback</button>
			</Link>
		</section>
	)
}

export default FeedbackHeader
