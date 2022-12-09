import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import type { FC, ChangeEvent } from 'react';

type Props = {
	label: string;
	value?: number;
	suffix?: string;
	disabled?: boolean;
	onChange: (value: number) => void;
};

export const Field: FC<Readonly<Props>> = ({ label, value, suffix, disabled = false, onChange }: Props) => (
	<div>
		<TextField
			type="number"
			label={label}
			value={isNaN(value as unknown as number) ? '' : value}
			fullWidth
			disabled={disabled}
			onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(parseInt(e.target.value, 10))}
			InputProps={
				suffix
					? {
							endAdornment: <InputAdornment position="end">{suffix}</InputAdornment>
					  }
					: {}
			}
		/>
	</div>
);

export default Field;
