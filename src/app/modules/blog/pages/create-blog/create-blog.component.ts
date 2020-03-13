import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CreateBlogQueryService } from '../../services/create-blog.service';
import { ClientService } from '../../../client/service/client.service'
import { FormGroup, FormBuilder, Validators, FormArray, ValidatorFn, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { regex } from '../../../config/regex';
import { GrowlAlertService } from './../../../../core/services/growl-alert.service';
import { Subject } from 'rxjs';
import { SearchQueryService } from '@app/modules/search/service/search.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit, OnDestroy {

  createBlogForm: FormGroup;
  slug: any;
  submitted = false;
  url: any;
  getCoe: any;
  regex_title = regex.regex_title;
  regex_url = regex.regex_url;
  tempBlogData = [];
  responseMsg: string;
  blogId: any;
  fileName: string;
  files = [];
  categories = [];
  isChecked = false;
  breadCrumb: any;
  coeName: any;
  tags: any = [];
  recommendedTags: any = [];
  visibleTags: any = [];
  blogDesc: any;
  blogSubscription: any;
  private _onDestroy = new Subject<void>();

  // Center of Excellence
  configCOA = {
    displayKey: 'type',
    height: '350%',
    placeholder: 'Select your option',
    search: false,
    limitTo: 5,
  };

  constructor(
    private _route: Router,
    private creatBlogService: CreateBlogQueryService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private clientservice: ClientService,
    private alertService: GrowlAlertService,
    private searchQueryService: SearchQueryService
  ) { }

  ngOnInit() {
    this.createBlogForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.pattern(this.regex_title)]],
      tags: ["", [Validators.required]],
      description: ["", [Validators.required, Validators.maxLength(200)]],
      categories: new FormArray([], this.minSelectedCheckboxes(1)),
      embeddedUrl: ["", [Validators.required, Validators.pattern(this.regex_url)]],
      coes: ["", [Validators.required]],
      authors: ["", [Validators.required]]
    })
    this.creatBlogService.getBlogCoe().valueChanges.subscribe(res => {
      this.getCoe = res['data']['coes'];
      this.subscribeToCUI();
    })
    this.getCategories();
    this.breadCrumb = [
      {
        label: 'Home',
        url: '/home',
        isActive: false
      }, {
        label: 'Blogs',
        url: '/blog',
        isActive: false
      }, {
        label: 'Create Blog',
        url: '/blog/create/blog',
        isActive: true
      }];
  }

  subscribeToCUI() {
    this.blogSubscription = this.searchQueryService.getAddBlogData().subscribe((res: any) => {
      console.log(res)
      if (!_.isEmpty(res)) {
        this.coeName = _.find(this.getCoe, (o) => { return o.type == res.coe});
      }

    })
  }

  saveNewBlog(param) {
    this.creatBlogService.createBlog(param).subscribe((res) => {
      if (res.data.createBlog) {
        this.blogId = res.data.createBlog.blog.id;
        this.getImageUpload();
        this.alertService.showSuccess('Blog Updated Successfully');
        setTimeout(() => {
          this._route.navigate(['/blog', this.blogId])
        }, 700)
      }
    })
  }

  onSearch(event) {
    let params = {
      "where": { "name_contains": event.term }
    }
    if (event.term.length >= 3) {
      this.clientservice.searchACM(params).valueChanges.subscribe((employess: any) => {
        this.tempBlogData = employess.data.employees;
      })
    }
  }

  //Add a items in tags ...
  onItemAdded(newtags) {
    this.createBlogForm.value.tags.map((elmtags, index) => {
      if (typeof (elmtags) == "object" && elmtags.value == elmtags.value) {
        this.createBlogForm.value.tags.splice(index, 1);
      }
    });
    this.createBlogForm.value.tags.push(newtags.value);
  }

  // method of select thumbnail images.....
  onSelectFile(fileEvents) {
    const reader = new FileReader();
    this.fileName = fileEvents.target.files[0];
    reader.readAsDataURL(fileEvents.target.files[0]); //read as url data of file...
    reader.onload = () => {
      this.url = reader.result;
      this.files.push(this.url);
      this.cd.markForCheck();
    };
  }

  // method of upload thumbnail images.....
  getImageUpload() {
    const formData = new FormData();
    formData.append('ref', 'blog');
    formData.append('field', 'thumbnail');
    formData.append('refId', this.blogId);
    formData.append('files', this.fileName);
    this.creatBlogService.uploadImage(formData).subscribe(res => { })
  }

  // removed the thumbnail......
  remove() {
    this.url = null;
    this.files = [];
    if (this.url === null) {
      this.responseMsg = "Thumbnail is required";
    }
  }
  // getting categories data from graphQL query 
  getCategories() {
    this.creatBlogService.getCheckBoxes().valueChanges.subscribe(res => {
      this.categories = res.data.categories;
      this.addCheckboxes();
    })
  }

  //adding checkboxes while loading blog detail ...
  addCheckboxes() {
    if ((this.createBlogForm.controls.categories as FormArray).length > 0) {
      return
    }
    this.categories.forEach((o, i) => {
      const control = new FormControl(); // if first item set to true, else false
      (this.createBlogForm.controls.categories as FormArray).push(control);
    });
  }

  //validation for checkboxes , atleast one should be slected before submit ...
  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);
      return totalSelected >= min ? null : { required: true };
    };
    return validator;
  }

  onSubmit() {
    this.submitted = true;
    let data = this.createBlogForm.value;
    if (data.authors) {
      let authors = [];
      data.authors.map(authorsId => {
        authors.push(authorsId.id);
      })
      data.authors = authors;
    }
    let catDataIds = this.createBlogForm.value.categories
      .map((v, i) => v ? this.categories[i].id : null)
      .filter(v => v !== null);
    data.categories = catDataIds;

    const coesId = data.coes.id;
    data.coes = [];
    data.coes.push(coesId);
    delete (data.thumbnail);
    const blogParams = {
      data: { data: data },
    }
    this.saveNewBlog(blogParams);
  }

  suggestTags(event) {
    if (this.blogDesc === event.target.value) {
      return;
    }

    this.blogDesc = event.target.value;
    let data = {
      "description": this.blogDesc
    }
    this.creatBlogService.getRecommendedTags(data).subscribe((res: any) =>{
      this.recommendedTags = res.data.recom_tags;
      this.visibleTags = res.data.recom_tags;
      this.updateVisibleTags();
    });
  }

  addTag(tag) {
    this.tags.push(tag);
    this.updateVisibleTags();
  }

  onTagRemoved(event) {
    delete this.tags[this.tags.indexOf(event)];
    this.updateVisibleTags();
  }

  updateVisibleTags() {
    this.visibleTags = [...this.recommendedTags];
    this.tags.forEach(element => {
      if (this.visibleTags.indexOf(element.toLowerCase()) !== -1) {
        delete this.visibleTags[this.visibleTags.indexOf(element.toLowerCase())];
      }
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();

    if (this.blogSubscription) {
      this.blogSubscription.unsubscribe();
    }
  }
}
