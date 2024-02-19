import { NewFeedbackIcon } from 'Assets/Icons'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useFeedbackContext } from 'Contexts'
import { Tutorials } from 'Components'
import { IFeedbackData } from 'API'

const Form = () => {
	const { addNewFeedback, tutorials } = useFeedbackContext()

	const {
		register,
		getValues,
		watch,
		setValue,
		formState: { errors, isValid },
	} = useForm({
		mode: 'onChange',
		defaultValues: {
			title: '',
			tutorial: {
				id: tutorials[0]._id as string,
				value: `${tutorials[0].name} - ${tutorials[0].lesson}`
			},
			description: ''
		}
	})

	const navigate = useNavigate()

	const createFeedback = () => {

		const newFeedback: IFeedbackData = {
			title: getValues().title,
			tutorial: getValues().tutorial.id,
			detail: getValues().description,
		} 


        
        addNewFeedback(newFeedback)
		navigate('/')
	}




	return (
		<form
			className='form'
			onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
		>
			<NewFeedbackIcon className='form__new-feedback-icon' />
			<h1 className='form__title'>Create New Feedback</h1>

			<fieldset className='form__fieldset'>
				<div className='form__fieldset__sub-container'>
					<label
						className={`form__label ${errors.title ? 'error' : ''}`}
						htmlFor='feedbackTitle'
					>
						Feedback Title
					</label>
					{errors.title ? <p className='form__error'>Can't be empty</p> : null}
				</div>
				<p className='form__desc'>Add a short, descriptive headline</p>
				<input
					className={`form__input ${errors.title ? 'error' : ''}`}
					id='feedbackTitle'
					{...register('title', { required: true })}
				/>
			</fieldset>

			<fieldset className='form__fieldset'>
				<label className='form__label' htmlFor='feedbackTutorial'>Tutorial</label>
				<p className='form__desc'>Choose a tutorial for your feedback</p>
				<Tutorials
					option={watch('tutorial')}
					setOption={(arg: { id: string; value: string }) =>
						setValue('tutorial', arg)
					}
				/>
			</fieldset>

			<fieldset className='form__fieldset'>
				<div className='form__fieldset__sub-container'>
					<label
						className={`form__label  ${errors.description ? 'error' : ''}`}
						htmlFor='feedbackDetail'
					>
						Feedback Detail
					</label>
					{errors.description ? <p className='form__error'>Can't be empty</p> : null}
				</div>
				<p className='form__desc'>
					Include any specific comments on what should be improved, added, etc.
				</p>
				<textarea
					className={`form__textarea ${errors.description ? 'error' : ''}`}
					id='feedbackDetail'
					{...register('description', { required: true })}
				/>
			</fieldset>
			<div className='form__buttons'>
				<button className='button--cancel' onClick={() => navigate(-1)}>Cancel</button>
				<button disabled={!isValid} className='button--primary' onClick={createFeedback}>Add Feedback</button>
			</div>
		</form>
	)
}

export default Form