import TextField from '@mui/material/TextField';
import type { FC, ChangeEvent } from 'react';

type Props = {
	id: string;
	label: string;
	value?: number;
	disabled?: boolean;
	onChange: (value: number) => void;
};

export const Field: FC<Readonly<Props>> = ({ id, label, value, disabled = false, onChange }: Props) => (
	<div>
		<TextField
			type="number"
			label={label}
			value={isNaN(value as unknown as number) ? '' : value}
			fullWidth
			disabled={disabled}
			onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(parseInt(e.target.value, 10))}
		/>
	</div>
);

export default Field;
