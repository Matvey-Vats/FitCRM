import clsx from 'clsx'
import React, { FC } from 'react'
import styles from './FilterButton.module.scss'

type FilterButtonProps = {
	children: React.ReactNode
	onClickFilter: () => void
	isActive: boolean
}

const FilterButton: FC<FilterButtonProps> = ({
	children,
	onClickFilter,
	isActive,
}) => {
	return (
		<button
			className={clsx(styles.btn, { [styles.active]: isActive })}
			onClick={onClickFilter}
		>
			{children}
		</button>
	)
}

export default FilterButton
