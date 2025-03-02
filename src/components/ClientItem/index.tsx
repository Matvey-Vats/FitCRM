import clsx from 'clsx'
import { FC, useState } from 'react'
import DeleteModal from '../DeleteModal'
import FormModal from '../FormModal'
import styles from './ClientItem.module.scss'

const ClientItem: FC = () => {
	const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
	const [updateModalIsOpen, setUpdateModalIsOpen] = useState(false)
	const [isActive, setIsActive] = useState(false)

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
				<td>Matvii Vats</td>
				<td>john@example.com</td>
				<td>+123456789</td>
				<td>01-03-2024</td>
				<td>30</td>
				<td className={clsx(styles.active, { [styles.inactive]: !isActive })}>
					{isActive ? 'Active' : 'Inactive'}
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
				isOpen={updateModalIsOpen}
				closeModal={closeUpdateModal}
				isUpdating={true}
			/>
			<DeleteModal isOpen={deleteModalIsOpen} closeModal={closeDeleteModal} />
		</>
	)
}

export default ClientItem
