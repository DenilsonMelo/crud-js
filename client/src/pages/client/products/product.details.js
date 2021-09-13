import { useState, useEffect } from 'react'; 
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

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
        background: '#F7F7F7'
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
}));
  

export default function ProductDetails(){
    const classes = useStyles();

    const [nome, setNome] = useState('');
    const [codigoBarras, setCodigoBarras] = useState('');
    const [valor, setValor] = useState('');
    const [caracteristica, setCaracteristica] = useState('');
    const [unidadeMedida, setUnidadeMedida] = useState('');
    const [marca, setMarca] = useState('');
    const [grupo, setGrupo] = useState('');

    const { idProduct } = useParams();

    useEffect(() => {
        async function getProduct(){
            let response = await api.get('/api/products.details/' + idProduct);

            setNome(response.data.nome);
            setCodigoBarras(response.data.codigo_barras);
            setValor(response.data.valor);
            setCaracteristica(response.data.caracteristica);
            setUnidadeMedida(response.data.unidade_medida);
            setMarca(response.data.marca);
            setGrupo(response.data.grupo);
        }

        getProduct();
    }, []);

    return(
        <div>
            <Paper className={classes.paper}>  
                <ButtonGroup aria-label="outlined primary button group">
                    <Button href={'/admin/produtos'} color="primary">Voltar</Button>
                    <Button href={'/'} color="primary">Página Inicial</Button>
                </ButtonGroup>
                <h1>{nome}</h1>  
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
                                    
                                    <TableRow>
                                    <TableCell component="th" scope="row">
                                        {nome}
                                    </TableCell>
                                    <TableCell align="center">{codigoBarras}</TableCell>
                                    <TableCell align="center">{valor}</TableCell>
                                    <TableCell align="center">{caracteristica}</TableCell>
                                    <TableCell align="center">
                                        {unidadeMedida == 1 ? 'Unidade' : 'Kilograma'}
                                    </TableCell>
                                    <TableCell align="center">
                                        {marca == 1 ? 'Bic' : 'Nike'}
                                    </TableCell>
                                    <TableCell align="center">
                                        {grupo == 1 ? 'ESL' : 'IEM'}
                                    </TableCell>
                                    </TableRow>
                                    
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}