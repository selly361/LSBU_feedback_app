import { ArrowDownIcon, CheckIcon } from 'Assets/Icons';
import { useFeedbackContext } from 'Contexts/Feedback'
import { useEffect, useRef, useState } from 'react'

interface IProps {
	option: { id: string; value: string }
	setOption: (args: { id: string; value: string }) => void
}

function Tutorials({ setOption, option }: IProps) {
	const { tutorials } = useFeedbackContext()

	const [toggle, setToggle] = useState(false)
	const modalRef = useRef<HTMLFieldSetElement>(null)

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

	return  (
		<fieldset id='feedbackTutorial' ref={modalRef} className='tutorials'>
			<button
				className={`tutorials__toggle-button ${toggle ? 'tutorials__toggle-button--active' : ''}`}
				onClick={() => setToggle((e) => !e)}
			>
				{option.value}
				<ArrowDownIcon />
			</button>
			{toggle ? (
				<div className='tutorials__dropdown'>
					{tutorials.map((tutorial) => (
						<button
							onClick={() =>
								setOption({
									id: tutorial._id as string,
									value: `${tutorial.name} - ${tutorial.lesson}`
								})
							}
							className='tutorials__dropdown__button'
						>
							{`${tutorial.name} - ${tutorial.lesson}`}
							{tutorial._id == option.id ? <CheckIcon /> : null}
						</button>
					))}
				</div>
			) : null}
		</fieldset>
	)
}

export default Tutorials
