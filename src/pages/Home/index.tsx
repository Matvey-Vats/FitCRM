import { FC } from 'react'
import ClientStats from '../../components/ClientStats'
import Header from '../../components/Header'
import Search from '../../components/Search'
import Sort from '../../components/Sort'

import ClientsList from '../../components/ClientsList'
import { useClientStore } from '../../store/store'
import styles from './Home.module.scss'

const Home: FC = () => {
	const clients = useClientStore(state => state.clients)

	return (
		<>
			{clients.length === 0 ? (
				<div
					style={{
						height: '600px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						textAlign: 'center',
					}}
				>
					<Header />
				</div>
			) : (
				<Header />
			)}

			{clients.length > 0 && (
				<>
					<ClientStats />
					<div className={styles.wrap}>
						<Search />
						<Sort />
					</div>
					<ClientsList />
				</>
			)}
		</>
	)
}

export default Home
