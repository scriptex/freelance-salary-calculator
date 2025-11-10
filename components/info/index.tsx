import type { FC } from 'react';

import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

type Props = {
	text: string;
};

export const Info: FC<Readonly<Props>> = ({ text }: Props) => (
	<Tooltip style={{ marginTop: '-2px' }} title={text}>
		<IconButton>
			<Icon>info</Icon>
		</IconButton>
	</Tooltip>
);

export default Info;
