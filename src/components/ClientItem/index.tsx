import clsx from 'clsx'
import dayjs from 'dayjs'
import { FC, useState } from 'react'
import DeleteModal from '../DeleteModal'
import FormModal from '../FormModal'
import styles from './ClientItem.module.scss'

import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

type ClientItemProps = {
	id: number
	name: string
	email: string
	phone: string
	firstDay: string
	subscription: number
	status: boolean
}

const getRemainingDays = (firstDay: string, subscription: number) => {
	const startDate = dayjs(firstDay)

	const today = dayjs()

	const daysPassed = today.diff(startDate, 'day')

	const remainingDays = subscription - daysPassed

	return remainingDays >= 0 ? remainingDays : 0
}

const ClientItem: FC<ClientItemProps> = ({
	id,
	name,
	email,
	phone,
	firstDay,
	subscription,
	status,
}) => {
	const remainingDays = getRemainingDays(
		dayjs(firstDay).format('YYYY.DD.MM'),
		subscription
	)
	const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
	const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false)

	const openDeleteModal = () => {
		setDeleteModalIsOpen(true)
	}

	const closeDeleteModal = () => {
		setDeleteModalIsOpen(false)
	}

	const openUpdateModal = () => {
		setUpdateModalIsOpen(true)
	}

	const closeUpdateModal = () => {
		setUpdateModalIsOpen(false)
	}
	return (
		<>
			<tr>
				<td>{name}</td>
				<td>{email}</td>
				<td>{phone}</td>
				<td>{firstDay}</td>
				<td>{remainingDays} Days</td>
				<td className={clsx(styles.active, { [styles.inactive]: !status })}>
					{status ? 'Active' : 'Inactive'}
				</td>
				<td className={styles.actions}>
					<button onClick={openUpdateModal} className={styles.updateBtn}>
						Update
					</button>
					<button onClick={openDeleteModal} className={styles.deleteBtn}>
						Delete
					</button>
				</td>
			</tr>
			<FormModal
				client={{ id, name, email, phone, firstDay, subscription, status }}
				isOpen={updateModalIsOpen}
				closeModal={closeUpdateModal}
				isUpdating={true}
			/>
			<DeleteModal
				id={id}
				isOpen={deleteModalIsOpen}
				closeModal={closeDeleteModal}
			/>
		</>
	)
}

export default ClientItem
