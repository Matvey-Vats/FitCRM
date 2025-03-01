import { FC } from 'react'
import ClientStats from '../../components/ClientStats'
import Header from '../../components/Header'
import Search from '../../components/Search'
import Sort from '../../components/Sort'

import styles from './Home.module.scss'

const Home: FC = () => {
	return (
		<>
			<Header />
			<ClientStats />
			<div className={styles.wrap}>
				<Search />
				<Sort />
			</div>
			<div>Home</div>
		</>
	)
}

export default Home
