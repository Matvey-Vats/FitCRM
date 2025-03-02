import { FC, useState } from 'react'
import FormModal from '../FormModal'
import styles from './Header.module.scss'

const Header: FC = () => {
	const [isOpen, setIsOpen] = useState(false)

	const openModal = () => {
		setIsOpen(true)
	}

	const closeModal = () => {
		setIsOpen(false)
	}

	return (
		<>
			<div className={styles.header}>
				<div>
					<h1 className={styles.title}>CRM for Fitness</h1>
					<button onClick={openModal} className={styles.btn}>
						Add new client
					</button>
				</div>
			</div>
			<FormModal isOpen={isOpen} closeModal={closeModal} />
		</>
	)
}

export default Header
