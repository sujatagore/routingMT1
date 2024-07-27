import { Component, NgModule } from "@angular/core";
import {  RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./shared/component/home/home.component";
import { UsersComponent } from "./shared/component/users/users.component";
import { ProductsComponent } from "./shared/component/products/products.component";
import { PagenotfoundComponent } from "./shared/component/pagenotfound/pagenotfound.component";
import { UserFormComponent } from "./shared/component/users/user-form/user-form.component";
import { UserComponent } from "./shared/component/users/user/user.component";
import { ProductFormComponent } from "./shared/component/products/product-form/product-form.component";
import { ProductComponent } from "./shared/component/products/product/product.component";

const routes: Routes =[
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'users',
        component: UsersComponent
    },
    {
        path: 'users/addUser',
        component: UserFormComponent
    },
    {
        path: 'users/:userId',
        component: UserComponent
    },
    {
        path: 'users/:userId/editUser',
        component: UserFormComponent
    },
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'products/addProduct',
        component: ProductFormComponent
    },
    {
        path: 'products/:productId',
        component: ProductComponent
    },
    {
        path: 'products/:productId/editProduct',
        component: ProductFormComponent
    },
    {
        path: 'page-not-found',
        component: PagenotfoundComponent
    },
    {
        path: '**',
        redirectTo: 'page-not-found'
    }
]

@NgModule({
    imports : [RouterModule.forRoot(routes)],
    exports : [RouterModule]
})

export class AppRoutingModule{

}