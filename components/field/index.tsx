import type { ChangeEvent, FC, ReactNode } from 'react';

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

type Props = {
	disabled?: boolean;
	label: string;
	onChange: (value: number) => void;
	suffix?: ReactNode;
	value?: number;
};

export const Field: FC<Readonly<Props>> = ({ disabled = false, label, onChange, suffix, value }: Props) => (
	<div>
		<TextField
			disabled={disabled}
			fullWidth
			label={label}
			onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(parseFloat(e.target.value))}
			slotProps={{
				input: suffix
					? {
							endAdornment: <InputAdornment position="end">{suffix}</InputAdornment>
						}
					: {}
			}}
			type="number"
			value={isNaN(value as unknown as number) ? '' : value}
		/>
	</div>
);

export default Field;
