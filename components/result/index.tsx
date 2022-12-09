import Typography from '@mui/material/Typography';
import type { FC } from 'react';

type Props = {
    title?: string;
    value: number;
};

export const Result: FC<Readonly<Props>> = ({ title, value }: Props) => (
    <Typography marginBottom={1}>
        {title && <strong>{title}</strong>}
        <span>{value}</span> лв.
    </Typography>
);

export default Result;
