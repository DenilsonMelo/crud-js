import React, {useState} from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import api from '../../../services/api';

import { login, setIdUser } from '../../../services/auth';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

    const [user, setUser] = useState('')
    const [senha, setSenha] = useState('')

    async function handleSubmit(){
        await api.post('/api/users/login', { user } )
        .then((response => {
            if(response.status === 200){
                if(response.data.status===1){
                    login(response.data.token);
                    setIdUser(response.data.id_client);

                    window.location.href= '/admin/produtos';
                }else if(response.data.status === 2){
                    alert('Atenção: '+response.data.error);
                }
            }else{
                alert('Erro no servidor');
            }
        }))
    }

    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign in
            </Typography>
           
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="user"
                label="Usuário"
                name="user"
                autoComplete="user"
                autoFocus
                value={user}
                onChange={e => setUser(e.target.value)}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="senha"
                label="Senha"
                type="password"
                id="senha"
                autoComplete="senha"
                value={senha}
                onChange={e => setSenha(e.target.value)}
            />
            <Button

                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
            >
                Entrar
            </Button>

        </div>
        </Container>
    );
}