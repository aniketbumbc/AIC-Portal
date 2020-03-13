import { Component, OnInit, ChangeDetectorRef, ViewChild, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray, ValidatorFn, FormControl } from '@angular/forms';
import { CreateBlogQueryService } from '../../services/create-blog.service';
import { ClientService } from '../../../client/service/client.service'
import { regex } from '../../../config/regex'
import { Location } from '@angular/common';
import { config } from '../../../../configs/app.configs'
import { GrowlAlertService } from './../../../../core/services/growl-alert.service';
import { Subject } from 'rxjs';
import { environment } from '@env/environment';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.scss']
})
export class UpdateBlogComponent implements OnInit, OnDestroy {
  @ViewChild('form') imageInput;    // to load cropped image from image upload component
  slug: any;
  blogEditForm: FormGroup;
  params: any;
  url: any;
  blogEditData: any;
  responseMsg: any;
  regex_title: any;
  regex_url: any;
  coeData: any;
  cat: any;
  catValue: any[];
  categoryNames: any[];
  tempBlogData = [];
  thumbnailName: any;
  files = [];
  isUpload = false;
  breadCrumb: any;
  recommendedTags: Array<string> = [];
  visibleTags: Array<string> = [];
  blogDesc: string;
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
    private route: ActivatedRoute,
    private _route: Router,
    private formBuilder: FormBuilder,
    private createBlogQueryService: CreateBlogQueryService,
    private cd: ChangeDetectorRef,
    private _location: Location,
    private clientservice: ClientService,
    private alertService: GrowlAlertService

  ) { }

  ngOnInit() {
    this.slug = this.route.snapshot.params.slug;
    this.params = {
      id: this.slug
    }
    this.regex_title = regex.regex_title;
    this.regex_url = regex.regex_url;
    this.blogEditForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(this.regex_title)]],
      tags: ['', Validators.required],
      authors: ['', Validators.required],
      coes: ['', Validators.required],
      description: ['', [Validators.required]],
      embeddedUrl: ['', [Validators.required, Validators.pattern(this.regex_url)]],
      categories: new FormArray([], this.minSelectedCheckboxes(1))
    })

    // getting the details of Blog from blogs GraphQL Query ..
    this.createBlogQueryService.getBlogDetail(this.params).valueChanges.subscribe(res => {
      this.blogEditData = res.data.blog;
      this.cat = this.blogEditData.categories;
      let categories = [];
      this.cat.forEach(obj => {
        categories.push(obj.category);
      })
      this.catValue = categories;
      this.getBlogCoe();
      this.getCategories();
      if (this.blogEditData.thumbnail !== null) {
        this.files.push(this.blogEditData.thumbnail);
        this.url = environment.imageUrl + this.blogEditData.thumbnail.url;
      } else {
        this.url = null;
      }
    });

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
        label: 'Details',
        url: `/blog/${this.slug}`,
        isActive: false
      }, {
        label: 'Edit',
        url: `/blog/${this.slug}/update`,
        isActive: true
      }];
  }

  // mutation calling for update Blog ...
  updateBlog(params) {
    this.createBlogQueryService.updateBlog(params).subscribe(
      res => {
        if (res.data.updateBlog) {
          if (this.isUpload) {
            this.getImageUpload();
          }
          this.alertService.showSuccess('Blog Updated Successfully');
          setTimeout(() => {
            this._route.navigate(['/blog', this.blogEditData.id])
          }, 700)
        }
      });
  }

  //Add a items in tags ...
  onItemAdded(newtags) {
    this.blogEditForm.value.tags.map((elmtags, index) => {
      if (typeof (elmtags) == "object" && elmtags.value == elmtags.value) {
        this.blogEditForm.value.tags.splice(index, 1);
      }
    });
    this.blogEditForm.value.tags.push(newtags.value);
    this.updateVisibleTags();
  }

  //method to select thumbnail ...
  onSelectFile(fileEvents) {
    const reader = new FileReader();
    this.thumbnailName = fileEvents.target.files[0];
    reader.readAsDataURL(fileEvents.target.files[0]); //read as url data of file...
    reader.onload = () => {
      this.url = reader.result;
      this.files.push(this.url);
      this.cd.markForCheck();
    };
    this.isUpload = true;
  }

  // method to upload thumbnail ...
  getImageUpload() {
    const formData = new FormData();
    formData.append('ref', 'blog');
    formData.append('field', 'thumbnail');
    formData.append('refId', this.blogEditData.id);
    formData.append('files', this.thumbnailName);
    this.createBlogQueryService.uploadImage(formData).subscribe(res => { })
  }

  //method to remove thumbnail ...
  remove() {
    this.url = null;
    this.files = [];
    if (this.url === null) {
      this.responseMsg = "Thumbnail is required";
    }
  }

  // search Employee data on dropdown ...
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

  // getting COE data from graphQL query 
  getBlogCoe() {
    this.createBlogQueryService.getBlogCoe().valueChanges.subscribe(res => {
      this.coeData = res.data.coes;
    })
  }

  // getting categories data from graphQL query 
  getCategories() {
    this.createBlogQueryService.getCheckBoxes().valueChanges.subscribe(res => {
      this.categoryNames = res.data.categories;
      this.addCheckboxes();
    })
  }

  //adding checkboxes while loading blog detail ...
  addCheckboxes() {
    let checkboxLabels = [];
    if ((this.blogEditForm.controls.categories as FormArray).length > 0) {
      return
    }
    if (this.categoryNames) {
      this.categoryNames.map(o => checkboxLabels.push(o.category));
      checkboxLabels.forEach((o, i) => {
        const control = new FormControl(this.catValue.indexOf(o) != -1);
        (this.blogEditForm.controls.categories as FormArray).push(control);
      });
    }
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
    let data = { ...this.blogEditForm.value };
    if (data.authors) {
      let author_id = [];
      data.authors.forEach(res => {
        author_id.push(res.id)
      })
      data.authors = author_id;
    }
    let coes = [];
    coes.push(data.coes.id);
    data.coes = coes;

    let catDataIds = this.blogEditForm.value.categories
      .map((v, i) => v ? this.categoryNames[i].id : null)
      .filter(v => v !== null);
    data.categories = catDataIds;
    const blogParams = {
      data: { data: data, where: this.params },
    }
    this.updateBlog(blogParams);
  }

  cancelBtnClicked(event) {
    this._location.back();
  }

  suggestTags(event) {
    if (this.blogDesc === event.target.value) {
      return;
    }

    this.blogDesc = event.target.value;
    let data = {
      "description": this.blogDesc
    }
    this.createBlogQueryService.getRecommendedTags(data).subscribe((res: any) =>{
      this.recommendedTags = res.data.recom_tags;
      this.visibleTags = res.data.recom_tags;
      this.updateVisibleTags();
    });
  }

  addTag(tag) {
    this.blogEditData.tags.push(tag);
    this.updateVisibleTags();
  }

  onTagRemoved(event) {
    delete this.blogEditData.tags[this.blogEditData.tags.indexOf(event)];
    this.updateVisibleTags();
  }

  updateVisibleTags() {
    this.visibleTags = [...this.recommendedTags];
    this.blogEditData.tags.forEach(element => {
      if (this.visibleTags.indexOf(element.toLowerCase()) !== -1) {
        delete this.visibleTags[this.visibleTags.indexOf(element.toLowerCase())];
      }
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
