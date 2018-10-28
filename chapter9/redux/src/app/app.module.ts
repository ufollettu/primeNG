import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {StoreModule} from '@ngrx/store';
import {APP_BASE_HREF} from '@angular/common';

// import needed PrimeNG modules here
import {ButtonModule} from 'primeng/components/button/button';
import {InputTextModule} from 'primeng/components/inputtext/inputtext';
import {DataTableModule} from 'primeng/components/datatable/datatable';
import {DialogModule} from 'primeng/components/dialog/dialog';
import {MessagesModule} from 'primeng/components/messages/messages';

import {AppComponent}  from './app.component';
import {DataTableCrudComponent}  from './section/crud.component';
import {routes} from './app-routing.module';

import {MockBackend} from '@angular/http/testing';
import {BaseRequestOptions} from '@angular/http';
import {fakeBackendProvider} from './backend/fake-backend';
import {EmployeeService} from './section/service/employee.service';
import {CrudActions} from './redux/crud.actions';
import {crudReducer} from './redux/crud.reducer';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        StoreModule.provideStore({crudReducer}),
        routes,
        FormsModule,
        HttpModule,
        ButtonModule,
        InputTextModule,
        DataTableModule,
        DialogModule,
        MessagesModule
    ],
    declarations: [AppComponent, DataTableCrudComponent],
    providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        EmployeeService,
        CrudActions,
        fakeBackendProvider,
        MockBackend,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
