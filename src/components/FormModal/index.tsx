import { FC, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Modal from 'react-modal'
import { IClient, Membership, useClientStore } from '../../store/store'
import styles from './FormModal.module.scss'

type FormModalTypes = {
	client?: IClient
	isOpen: boolean
	closeModal: () => void
	isUpdating?: boolean
}

type FormInputsTypes = {
	name: string
	email: string
	phone: string
	subscription: number
	status: boolean
}

Modal.setAppElement('#root')

const FormModal: FC<FormModalTypes> = ({
	client,
	isOpen,
	closeModal,
	isUpdating,
}) => {
	const { memberships, clients, addClient, updateClient } = useClientStore()

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<FormInputsTypes>({
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			subscription: Membership.MONTH,
			status: false,
		},
	})

	useEffect(() => {
		if (isUpdating && client) {
			setValue('name', client.name)
			setValue('email', client.email)
			setValue('phone', client.phone)
			setValue('subscription', client.subscription)
			setValue('status', client.status)
		} else {
			reset()
		}
	}, [isUpdating, client, setValue, reset])

	const createNewClientSubmit: SubmitHandler<FormInputsTypes> = data => {
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

	const updateClientSubmit: SubmitHandler<FormInputsTypes> = data => {
		if (client) {
			updateClient(client.id, {
				id: client.id,
				firstDay: client.firstDay,
				...data,
				subscription: data.subscription as Membership,
				status: !!data.status,
			})
		}

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
				<form
					onSubmit={handleSubmit(
						isUpdating ? updateClientSubmit : createNewClientSubmit
					)}
					className={styles.modalForm}
				>
					<input
						type='text'
						placeholder='Name'
						{...register('name', { required: 'Name is required' })}
					/>
					{errors.name && <p className={styles.error}>{errors.name.message}</p>}

					<input
						type='email'
						placeholder='Email'
						{...register('email', { required: 'Email is required' })}
					/>
					{errors.email && (
						<p className={styles.error}>{errors.email.message}</p>
					)}

					<input
						type='text'
						placeholder='Phone'
						{...register('phone', { required: 'Phone is required' })}
					/>
					{errors.phone && (
						<p className={styles.error}>{errors.phone.message}</p>
					)}

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
					{errors.subscription && (
						<p className={styles.error}>{errors.subscription.message}</p>
					)}

					<label>
						<input type='checkbox' {...register('status')} />
						Active
					</label>

					<button type='submit'>{isUpdating ? 'Update' : 'Add'}</button>
				</form>
				<button onClick={closeModal} className={styles.closeBtn}>
					Close
				</button>
			</div>
		</Modal>
	)
}

export default FormModal
