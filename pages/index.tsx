import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Switch from '@mui/material/Switch';
import format from 'date-fns/format';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/system/Container';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useState, useMemo } from 'react';

import type { Data } from 'pages/api/types';
import { Field, Result, Converter } from 'components';

export default function Home() {
    const [type, setType] = useState<'hourly' | 'yearly'>('hourly');
    const [hourRate, setHourRate] = useState<number | undefined>();
    const [yearRate, setYearRate] = useState<number | undefined>();
    const [insurance, setInsurance] = useState<number | undefined>(3400);
    const [currencyData, setCurrencyData] = useState<Data | undefined>();
    const [hoursInMonth, setHoursInMonth] = useState(
        Math.round(((365 - 52 * 2 - 20 - 12) / 12) * 8),
    );
    const [advancedMode, setAdvancedMode] = useState(false);

    const ratePerHour: number = useMemo(
        () =>
            Math.round(
                type === 'hourly'
                    ? hourRate || 0
                    : !yearRate
                    ? 0
                    : yearRate / hoursInMonth / 12,
            ),
        [type, hourRate, yearRate, hoursInMonth],
    );

    const netSalary = useMemo(
        () => ratePerHour * hoursInMonth,
        [hoursInMonth, ratePerHour],
    );

    const insuranceAmount = useMemo(
        () => (!insurance ? 0 : (insurance / 100) * 27.8),
        [insurance],
    );

    const expenses = useMemo(() => (netSalary / 100) * 25, [netSalary]);

    const quarterlyTaxGround = useMemo(
        () => Math.round(netSalary * 3 - expenses * 3 - insuranceAmount * 3),
        [expenses, netSalary, insuranceAmount],
    );

    const quarterlyTax = useMemo(
        () => Math.round((quarterlyTaxGround / 100) * 10),
        [quarterlyTaxGround],
    );

    const salary = useMemo(
        () => Math.round(netSalary - insuranceAmount - quarterlyTax / 3),
        [netSalary, quarterlyTax, insuranceAmount],
    );

    useEffect(() => {
        const abortController = new AbortController();
        const { signal } = abortController;

        fetch('/api/data', { signal })
            .then((r) => r.json())
            .then((d: Data) => setCurrencyData(d));

        return () => {
            abortController.abort();
        };
    }, []);

    return (
        <Container>
            <Box marginTop={10}>
                <Typography variant="h4" marginBottom={1} textAlign="center">
                    Калкулатор за заплата на фрийлансър/контрактор
                </Typography>

                <Typography marginBottom={10} textAlign="center">
                    <em>
                        според Българското законодателство и{' '}
                        <Link
                            href="https://nra.bg/wps/portal/nra/taxes/godishen-danak-varhu-dohdite/svobodni-profesii"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            разпоредбите на НАП
                        </Link>
                    </em>
                </Typography>

                <Divider style={{ margin: '50px 0' }} />

                <Typography variant="h5">Входни данни:</Typography>

                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    marginBottom={5}
                >
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography>Тип на калкулациите</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={type === 'hourly'}
                                    onChange={() => setType('hourly')}
                                />
                            }
                            label="С часова ставка"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={type === 'yearly'}
                                    onChange={() => setType('yearly')}
                                />
                            }
                            label="На годишна база"
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={advancedMode}
                                    onChange={() =>
                                        setAdvancedMode(!advancedMode)
                                    }
                                />
                            }
                            label="Редакция на работните часове за един месец"
                        />
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    marginBottom={5}
                >
                    <Grid item xs={12} sm={6} md={4}>
                        {type === 'hourly' && (
                            <Field
                                id="hour-rate"
                                label="Часова ставка"
                                value={hourRate}
                                onChange={setHourRate}
                            />
                        )}

                        {type === 'yearly' && (
                            <Field
                                id="year-rate"
                                label="Годишна заплата"
                                value={yearRate}
                                onChange={setYearRate}
                            />
                        )}
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Field
                            id="insurance"
                            label="Осигурителен праг"
                            value={insurance}
                            onChange={setInsurance}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Field
                            id="hours-in-month"
                            label="Работни часове за един месец"
                            value={hoursInMonth}
                            disabled={!advancedMode}
                            onChange={setHoursInMonth}
                        />
                    </Grid>
                </Grid>

                <Divider style={{ margin: '20px 0' }} />

                {!ratePerHour ? null : (
                    <Grid container spacing={2} marginBottom={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h5" marginBottom={2}>
                                Резултати
                            </Typography>

                            <Result title="Нетна заплата: " value={netSalary} />

                            <Result
                                title="Признати разходи (25%): "
                                value={expenses}
                            />

                            <Result
                                title="Осигуровки (27.8%): "
                                value={insuranceAmount}
                            />

                            <Result
                                title="Данъчна основа за тримесечие: "
                                value={quarterlyTaxGround}
                            />

                            <Result
                                title="Данък за тримесечие: "
                                value={quarterlyTax}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography variant="h5" marginBottom={2}>
                                Остатък на месец:{' '}
                            </Typography>

                            <Result value={salary}></Result>

                            <Converter
                                data={currencyData}
                                value={salary}
                                currency="EUR"
                            />

                            <Converter
                                data={currencyData}
                                value={salary}
                                currency="USD"
                            />

                            <Converter
                                data={currencyData}
                                value={salary}
                                currency="GBP"
                            />

                            {currencyData?.data?.meta.last_updated_at && (
                                <Typography marginBottom={1} fontSize={12}>
                                    <em>
                                        Валутните курсове са обновени на{' '}
                                        {format(
                                            new Date(
                                                currencyData?.data?.meta.last_updated_at,
                                            ),
                                            'dd MMM yyyy, HH:mm',
                                        )}
                                    </em>
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Container>
    );
}
