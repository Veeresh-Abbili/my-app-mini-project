import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AllEmployeesService } from '../all-employees.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {
  public employeeForm: FormGroup = new FormGroup({
    Name: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    package: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    dob: new FormControl('', Validators.required),
    address: new FormGroup({
      addressLine: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.required)
    }),
    gender: new FormControl('', Validators.required),
    workMode: new FormControl(''),
    Hikes: new FormArray([]),
  });

  get HikesFormArray() {
    return this.employeeForm.get('Hikes') as FormArray;
  }

  id: number = 0;

  constructor(private _allEmployeesService: AllEmployeesService,
              private _router: Router,
              private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.params.subscribe(
      (data: any) => {
        console.log(data.id);
        this.id = +data.id; // Ensure it's a number
        if (this.id) {
          this._allEmployeesService.getAllEmployee(this.id).subscribe(
            (data: any) => {
              console.log(data);
              this.employeeForm.patchValue(data);
              this.handleWorkModeChange(data.workMode);
            },
            (err: any) => {
              alert("Internal Server Error");
            }
          );
        }
      },
      (err: any) => {
        alert("Internal Server Error");
      }
    );

    this.employeeForm.get('workMode')?.valueChanges.subscribe(
      (data: any) => {
        this.handleWorkModeChange(data);
      }
    );
  }

  handleWorkModeChange(workMode: string) {
    const workModeGroup = this.employeeForm.get('workMode') as FormGroup;
    if (workMode === 'WFH') {
      workModeGroup.addControl('wifibill', new FormControl());
      if (workModeGroup.contains('travelfee')) {
        workModeGroup.removeControl('travelfee');
      }
    } else {
      workModeGroup.addControl('travelfee', new FormControl());
      if (workModeGroup.contains('wifibill')) {
        workModeGroup.removeControl('wifibill');
      }
    }
  }

  addHike() {
    this.HikesFormArray.push(
      new FormGroup({
        year: new FormControl(),
        Hike: new FormControl(),
      })
    );
  }

  deleteHike(i: number) {
    this.HikesFormArray.removeAt(i);
  }

  submit() {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
      this.CreateEmployee(); // Call the Create or Update method here
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  CreateEmployee() {
    if (this.id) {
      console.log(this.employeeForm.value);
      this._allEmployeesService.updateemployee(this.id, this.employeeForm.value).subscribe(
        (data: any) => {
          console.log(data);
          alert("Employee Record Updated Successfully!");
          this._router.navigateByUrl('/mini-project/all-employees');
        },
        (err: any) => {
          alert(err?.error?.message || 'Internal Server Error');
        }
      );
    } else {
      console.log(this.employeeForm.value);
      this._allEmployeesService.createemployee(this.employeeForm.value).subscribe(
        (data: any) => {
          console.log(data);
          alert("New Employee Created Successfully");
          this._router.navigateByUrl('/mini-project/all-employees');
        },
        (err: any) => {
          alert(err?.error?.message || 'Internal Server Error');
        }
      );
    }
  }
}