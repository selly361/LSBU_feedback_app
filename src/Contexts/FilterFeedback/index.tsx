import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
	useRef
} from 'react'
import { useFeedbackContext } from 'Contexts/Feedback'
import { Comment } from 'Types' 

type TFilter = 'Most Upvotes' | 'Least Upvotes' | 'Most Comments' | 'Least Comments'


interface IFilterFeedbackContext {
	filter: TFilter
	setFilter: React.Dispatch<React.SetStateAction<TFilter>>
	modalRef: React.RefObject<HTMLButtonElement>
	toggle: boolean
	setToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const FilterFeedbackContext = createContext<IFilterFeedbackContext | undefined>(undefined)


const useFilterFeedbackContext = () => {
	const context = useContext(FilterFeedbackContext)

	if (!context) throw new Error('useFeedbackContext must be used within a FilterFeedbackProvider')

	return context
}

interface IProps {
	children: ReactNode
}

function FilterFeedbackProvider({ children }: IProps) {

	const { setFeedbacks, feedbacks } = useFeedbackContext()

	const [filter, setFilter] = useState<TFilter>('Most Upvotes')
	const [toggle, setToggle] = useState(false)

	const modalRef = useRef<HTMLButtonElement>(null)

	function handleClickOutside(event: any) {
		if (modalRef.current && !modalRef.current.contains(event.target)) {
			setToggle(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	})

	useEffect(() => {

		if (filter === 'Most Comments') {
			setFeedbacks((e) => e.sort((a, b) => commentsLength(b.comments) - commentsLength(a.comments)))
		} 
		
		else if (filter === 'Least Comments') {
			setFeedbacks((e) => e.sort((a, b) => commentsLength(a.comments) - commentsLength(b.comments)))
		} 
		
		else if (filter === 'Most Upvotes') {
			setFeedbacks((e) => e.sort((a, b) => b.netLikes - a.netLikes))
		} 
		
		else {
			setFeedbacks((e) => e.sort((a, b) => b.netLikes - a.netLikes))
		}

	}, [filter])

	const commentsLength = (comments: Comment[]) => comments.reduce((prev, curr) => prev + (curr.replies.length || 0), comments.length)


	return (
		<FilterFeedbackContext.Provider value={{ filter, setFilter, modalRef, toggle, setToggle }}>
			{children}
		</FilterFeedbackContext.Provider>
	)
}


export default FilterFeedbackProvider
export { useFilterFeedbackContext }