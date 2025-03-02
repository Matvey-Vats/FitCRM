import { FC } from 'react'
import ClientItem from '../ClientItem'
import styles from './ClientsList.module.scss'

const ClientsList: FC = () => {
	return (
		<div className={styles.container}>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Phone</th>
						<th>First Day</th>
						<th>Days of Subscribe</th>
						<th>Status</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					<ClientItem />
					<ClientItem />
				</tbody>
			</table>
		</div>
	)
}

export default ClientsList
