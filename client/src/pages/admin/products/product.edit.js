import { useState, useEffect } from 'react'; 
import { useParams } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import api from '../../../services/api';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    title: {
      flexGrow: 1,
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
  

export default function ProdutosEditar(){
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

    async function handleSubmit(){
        const data = {
            nome: nome, 
            codigo_barras: codigoBarras, 
            valor: valor, 
            caracteristica: caracteristica, 
            unidade_medida: unidadeMedida, 
            marca: marca, 
            grupo: grupo,
            _id: idProduct,
        }

        if(nome !== '' 
            && codigoBarras !== '' 
            && valor !== '' 
            && caracteristica !== '' 
            && unidadeMedida !== '' 
            && marca !== '' 
            && grupo !== ''
        ) {
            const response = await api.put('/api/products', data);

            if(response.status === 200){
                window.location.href='/admin/produtos'
            } else{
                alert('Erro ao atualizar o produto!');
            }
        } else{
            alert('Por favor, preencha todos os campos!')
        }
    }

    return(
        <div>
            <Paper className={classes.paper}>  
                <h1>Edição de Produtos</h1>  
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="nome"
                            name="nome"
                            label="Nome"
                            fullWidth
                            autoComplete="nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="codigoBarras"
                            name="codigoBarras"
                            label="Código de Barras"
                            fullWidth
                            autoComplete="codigoBarras"
                            value={codigoBarras}
                            onChange={e => setCodigoBarras(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                            required
                            id="valor"
                            name="valor"
                            label="Valor"
                            fullWidth
                            autoComplete="valor"
                            value={valor}
                            onChange={e => setValor(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <TextField
                            required
                            id="caracteristica"
                            name="caracteristica"
                            label="Característica"
                            fullWidth
                            autoComplete="caracteristica"
                            value={caracteristica}
                            onChange={e => setCaracteristica(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="labelUnidadeMedida">Unidade de Medida</InputLabel>
                            <Select
                                labelId="labelUnidadeMedida"
                                id="unidadeMedida"
                                fullWidth
                                value={unidadeMedida}
                                onChange={e => setUnidadeMedida(e.target.value)}
                            >
                                <MenuItem value={1}>Unidade</MenuItem>
                                <MenuItem value={2}>Kilograma</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="labelMarca">Marca</InputLabel>
                            <Select
                                labelId="labelMarca"
                                id="marca"
                                fullWidth
                                value={marca}
                                onChange={e => setMarca(e.target.value)}
                            >
                                <MenuItem value={1}>Bic</MenuItem>
                                <MenuItem value={2}>Nike</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="labelGrupo">Grupo</InputLabel>
                            <Select
                                labelId="labelGrupo"
                                id="grupo"
                                fullWidth
                                value={grupo}
                                onChange={e => setGrupo(e.target.value)}
                            >
                                <MenuItem value={1}>ESL</MenuItem>
                                <MenuItem value={2}>IEM</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                    <Button onClick={handleSubmit} variant="contained" color="primary">
                        Atualizar Produto
                    </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}