import { FC, useState } from 'react'
import { useSearchStore } from '../../store/store'
import FilterButton from '../FilterButton'
import styles from './Sort.module.scss'

const sortList = ['All', 'Active', 'Inactive', 'Will expire soon']

const Sort: FC = () => {
	const [isActive, setIsActive] = useState(0)
	const setSort = useSearchStore(state => state.setSort)

	const handleFilterClick = (index: number) => {
		setIsActive(index)
		setSort({ id: index, name: sortList[index] })
	}

	return (
		<div className={styles.block}>
			<div className={styles.row}>
				{sortList.map((filter, index) => (
					<FilterButton
						key={index}
						onClickFilter={() => handleFilterClick(index)}
						isActive={isActive === index}
					>
						{filter}
					</FilterButton>
				))}
			</div>
		</div>
	)
}

export default Sort
