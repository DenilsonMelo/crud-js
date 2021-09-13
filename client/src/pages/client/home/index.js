import { useState, useEffect } from 'react'; 

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { makeStyles } from '@material-ui/core/styles';

import api from '../../../services/api';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    title: {
      flexGrow: 1,
    },
    table: {
        minWidth: 650,
        background: '#F7F7F7',
        color: '#000'
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: 32,
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '100%',
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      bold: {
          fontWeight: '600',
      }
}));



export default function Home(){
    const classes = useStyles();

    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        async function loadProducts(){
            const response = await api.get('/api/products');
            setProdutos(response.data);
        }

        loadProducts();

    }, []);

    return(
        <div>
            <Paper className={classes.paper}>  
                <ButtonGroup aria-label="outlined primary button group">
                    <Button href={'/admin/login/'} color="primary">Entrar - Área Administrativa</Button>
                </ButtonGroup>
                <h1>Listagem de Produtos - Área Comercial</h1>  
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <TableContainer component={Paper}>
                            <Table className={classes.table} size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow className={classes.bold}>
                                        <TableCell>Nome</TableCell>
                                        <TableCell align="center">Código de Barras</TableCell>
                                        <TableCell align="center">Valor (R$)</TableCell>
                                        <TableCell align="center">Característica</TableCell>
                                        <TableCell align="center">Un. Medida</TableCell>
                                        <TableCell align="center">Marca</TableCell>
                                        <TableCell align="center">Grupo</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {produtos.map((row) => (
                                        <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.nome}
                                        </TableCell>
                                        <TableCell align="center">{row.codigo_barras}</TableCell>
                                        <TableCell align="center">{row.valor.toFixed(2)}</TableCell>
                                        <TableCell align="center">{row.caracteristica}</TableCell>
                                        <TableCell align="center">
                                            {row.unidade_medida == 1 ? 'Unidade' : 'Kilograma'}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.marca == 1 ? 'Bic' : 'Nike'}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.grupo == 1 ? 'ESL' : 'IEM'}
                                        </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}