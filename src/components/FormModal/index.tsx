import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Modal from 'react-modal'
import { Membership, useClientStore } from '../../store/store'
import styles from './FormModal.module.scss'

type FormModalTypes = {
	isOpen: boolean
	closeModal: () => void
	isUpdating: boolean
}

// interface ISubscription {
// 	value: number
// 	label: string
// }

type FormInputsTypes = {
	name: string
	email: string
	phone: string
	subscription: number
	status: boolean
}

Modal.setAppElement('#root')

const FormModal: FC<FormModalTypes> = ({ isOpen, closeModal, isUpdating }) => {
	const { memberships, clients, addClient } = useClientStore()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormInputsTypes>()

	const onSubmit: SubmitHandler<FormInputsTypes> = data => {
		addClient({
			id: clients.length + 1,
			firstDay: new Date().toLocaleDateString(),
			...data,
			subscription: data.subscription as Membership,
			status: !!data.status,
		})

		reset()
		closeModal()
	}

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={closeModal}
			className={styles.modal}
			style={{ overlay: { backgroundColor: 'transparent' } }}
		>
			<div className={styles.modalContent}>
				<h3>{isUpdating ? 'Update client data' : 'Add new client'}</h3>
				<form onSubmit={handleSubmit(onSubmit)} className={styles.modalForm}>
					<input
						type='text'
						placeholder='Name'
						{...register('name', { required: 'Name is required' })}
					/>
					{errors && <p className={styles.error}>{errors.name?.message}</p>}
					<input
						type='email'
						placeholder='Email'
						{...register('email', { required: 'Email is required' })}
					/>
					{errors && <p className={styles.error}>{errors.email?.message}</p>}
					<input
						type='text'
						placeholder='Phone'
						{...register('phone', { required: 'Phone is required' })}
					/>
					{errors && <p className={styles.error}>{errors.phone?.message}</p>}
					<select
						className={styles.memberships}
						{...register('subscription', { valueAsNumber: true })}
					>
						{memberships.map((membership, index) => (
							<option key={index} value={membership.value}>
								{membership.label}
							</option>
						))}
					</select>
					{errors && (
						<p className={styles.error}>{errors.subscription?.message}</p>
					)}
					<label>
						<input type='checkbox' {...register('status')} />
						Active
					</label>

					<button>{isUpdating ? 'Update' : 'Add'}</button>
				</form>
				<button onClick={closeModal} className={styles.closeBtn}>
					Close
				</button>
			</div>
		</Modal>
	)
}

export default FormModal
