import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Employee} from '../../model/employee';
import {CrudActions} from '../../redux/crud.actions';
import {Action} from '@ngrx/store';

@Injectable()
export class EmployeeService {

    private static handleError(error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            if (error.status === 404) {
                errMsg = `Resource ${error.url} was not found`;
            } else {
                const body = error.json() || '';
                const err = body.error || JSON.stringify(body);
                errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
            }
        } else {
            errMsg = error.message ? error.message : error.toString();
        }

        return Observable.throw(errMsg);
    }

    constructor(private http: Http, private crudActions: CrudActions) {
    }

    getEmployees(): Observable<Action> {
        return this.http.get('/fake-backend/employees')
            .map(response => response.json() as Employee[])
            .map(employees => this.crudActions.loadEmployees(employees))
            .catch(EmployeeService.handleError);
    }

    createEmployee(employee: Employee): Observable<Action> {
        return this.http.post('/fake-backend/employees', employee)
            .map(response => response.json() as Employee)
            .map(createdEmployee => this.crudActions.createEmployee(createdEmployee))
            .catch(EmployeeService.handleError);
    }

    updateEmployee(employee: Employee): Observable<Action> {
        return this.http.put('/fake-backend/employees', employee)
            .map(response => response.json())   // this line is not really needed
            .map(() => this.crudActions.updateEmployee(employee))
            .catch(EmployeeService.handleError);
    }

    deleteEmployee(id: string): Observable<Action> {
        return this.http.delete('/fake-backend/employees/' + id)
            .map(response => response.json())   // this line is not really needed
            .map(() => this.crudActions.deleteEmployee(id))
            .catch(EmployeeService.handleError);
    }
}
