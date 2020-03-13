
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
  @Component({
  selector: 'app-add-more',
  templateUrl: './add-more.component.html',
  styleUrls: ['./add-more.component.scss']
})
export class AddMoreComponent implements OnInit {
  memberForm: FormGroup;
  newmemberForm: FormGroup;
  locations = [ 'Mumbai', 'Pune'];
  skillSet = [];
  configLocation = {
    displayKey: 'locationkey', // if objects array passed which key to be displayed defaults to description
    search: false, // true/false for the search functionlity defaults to false
    height: 'auto', // height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
    placeholder: 'Select Location' // text to be displayed when no item is selected defaults to Select,
  };
    submitted = false;
  constructor(private formBuilder: FormBuilder,
    ){}
    ngOnInit() {
      this.memberForm = this.formBuilder.group({
        member: ['', Validators.required],
        role: ['', [Validators.required, Validators.pattern("[a-zA-Z][a-zA-Z ]+")]],
        start_date: ['', Validators.required],
        end_date: ['', Validators.required]
      });
      this.newmemberForm = this.formBuilder.group({
        newrole: ['', Validators.required],
        positions: ['', Validators.required],
        project: ['', Validators.required],
        location: ['', Validators.required],
        skills: ['', Validators.required],
        assigned: ['Name'],
        raisedBy: ['Name'],
        request: [10]
      });
    }
  get m() {
    return this.memberForm.controls;
  }
  get newmember() {
    return this.newmemberForm.controls;
  }
  newmemberSubmit() {
    this.submitted = true;
    console.log(this.newmemberForm.value);
    // tslint:disable-next-line: no-unused-expression
    // console.log("lovarion", this.newmemberForm.value['skills']);
    // console.log('skillSet', this.skillSet);
  }
  onSave(): void {
    if (this.memberForm.invalid) {
        // this.showModel = true;
    } else {
        // this.showModel = false;
        // let newMemberData = {
        //     end_date: (this.present)?"present":moment(this.memberForm.value.end_date).format("YYYY-MM-DD"),
        //     is_new: true,
        //     member: (this.memberForm.value.member).replace(' ', '-').toLowerCase(),
        //     project_id: this.projectDetailEdit._id,
        //     role: this.memberForm.value.role,
        //     start_date: moment(this.memberForm.value.start_date).format("YYYY-MM-DD"),
        //     presentChk2:this.present
        // }
        // this.projectDetailEdit.members.push(newMemberData);
        // this.present=false;
        // this.maxDateValueStartDate=null;
        // this.minDateValueEndDate=null;
        // this.memberForm.reset();
        return
    }
}
}
