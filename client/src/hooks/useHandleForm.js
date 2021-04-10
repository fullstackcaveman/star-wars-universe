import { useState } from 'react';
import update from 'immutability-helper';

export const useHandleForm = (initialValues) => {
	const [value, setValue] = useState(initialValues);

	const handleChange = (input) => {
		setValue({
			...value,
			[input.name]: input.value,
		});
	};

	const handleArrayChange = (e, index, arr) => {
		setValue(
			update(value, {
				[arr]: {
					[index]: {
						$set: e.target.value,
					},
				},
			})
		);
	};

	const handleAddItem = (arr) => {
		const newArray = value[arr].push('');
		setValue({ ...value, newArray });
	};

	const handleDelete = (arr, index) => {
		const newArray = value[arr].filter((item) => item !== value[arr][index]);
		setValue({ ...value, [arr]: newArray });
	};

	return [
		value,
		setValue,
		handleChange,
		handleArrayChange,
		handleAddItem,
		handleDelete,
	];
};
