import clsx from 'clsx'
import { FC, useState } from 'react'

import { useClientStore } from '../../store/store'
import styles from './ClientStats.module.scss'

const ClientStats: FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const { total, totalActive, totalInactive } = useClientStore()

	return (
		<div className={styles.block}>
			<button onClick={() => setIsOpen(!isOpen)} className={styles.openBtn}>
				{isOpen ? 'Hide stats' : 'Open stats'}
			</button>
			<div className={clsx(styles.wrapper, { [styles.open]: isOpen })}>
				<div className={styles.item}>
					<h3>Total clients</h3>
					<p>{total ? total : 0}</p>
				</div>
				<div className={styles.item}>
					<h3>Total clients active</h3>
					<p>{totalActive ? totalActive : 0}</p>
				</div>
				<div className={styles.item}>
					<h3>Total clients inactive</h3>
					<p>{totalInactive ? totalInactive : 0}</p>
				</div>
			</div>
		</div>
	)
}

export default ClientStats
