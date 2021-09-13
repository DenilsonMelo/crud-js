import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

// IMPORTS ADMIN
import Produtos from './pages/admin/products';
import ProdutosEditar from './pages/admin/products/product.edit';
import ProdutosCadastrar from './pages/admin/products/product.create';
import Login from './pages/admin/login';

// IMPORTS CLIENT
import Home from './pages/client/home';
import ProdutosDetails from './pages/client/products/product.details';

import PrivateRoute from './services/wAuth';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                
                <Route path="/" exact component={Home} />
                <Route path="/produtos/:idProduct" exact component={ProdutosDetails}/>
                
                <Route path="/admin/login" exact component={Login}/>
                
                <Route path="/admin/produtos" exact component={Produtos}/>
                <Route path="/admin/cadastrar" exact component={ProdutosCadastrar}/>
                <Route path="/admin/editar/:idProduct" exact component={ProdutosEditar}/>
            </Switch>
        </BrowserRouter>
    )
}