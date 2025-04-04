import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllEmployeesService } from '../all-employees.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent {
  id:any='0';
  allEmployee:any='';
  constructor(private _activateRoute:ActivatedRoute,private _allEmployeesService:AllEmployeesService){
    _activateRoute.params.subscribe(
      (data:any)=>{
        console.log(data.id);
        this.id=data.id;
        console.log(this.id);
      },(err:any)=>{
          alert("Internal Server Error")
        }
    )
    _allEmployeesService.getAllEmployee(this.id).subscribe(
      (data:any)=>{
        console.log(data);
        this.allEmployee=data;
      },(err:any)=>{
        alert("Internal Server Error");
      }
    )
  }

}
