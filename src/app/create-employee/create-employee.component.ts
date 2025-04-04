import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {
  public employeeForm:FormGroup=new FormGroup({
    Name:new FormControl(),
    company:new FormControl(),
    role:new FormControl(),
    package:new FormControl(),
    email:new FormControl(),
    dob:new FormControl(),
    address:new FormControl({
      addressLine:new FormControl(),
      city:new FormControl(),
      state:new FormControl(),
      pincode:new FormControl(),}),
    gender:new FormControl(),
    workMode:new FormControl(),
    Hikes:new FormArray([]),

  })
  get HikesFormArray(){
    return this.employeeForm.get('Hikes') as FormArray;
  }


  addhike(){
    this.HikesFormArray.push(
      new FormGroup({
        year:new FormControl(),
        Hike:new FormControl(),
      })
    )

  }
  
  deletehike(i:number){
    this.HikesFormArray.removeAt(i);
  }

  constructor(){
    this.employeeForm.get('workMode')?.valueChanges.subscribe(
      (data:any)=>{
        if(data=='WFH'){
          this.employeeForm.addControl('wifibill',new FormControl());
          this.employeeForm.removeControl('travelfee');
        }else{
          this.employeeForm.addControl('travelfee',new FormControl());
          this.employeeForm.removeControl('wifibill');
       }
      }
    )
  }

  submit(){
    console.log(this.employeeForm.value);
    
  }

}
