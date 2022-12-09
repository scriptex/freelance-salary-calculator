import type { FC } from 'react';

import Icon from '@mui/material/Icon';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

type Props = {
	text: string;
};

export const Info: FC<Readonly<Props>> = ({ text }: Props) => (
	<Tooltip title={text} style={{ marginTop: '-2px' }}>
		<IconButton>
			<Icon>info</Icon>
		</IconButton>
	</Tooltip>
);

export default Info;
