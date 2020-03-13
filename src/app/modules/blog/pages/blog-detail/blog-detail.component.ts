import { Component, OnInit, OnDestroy } from '@angular/core';
import { CreateBlogQueryService } from '../../services/create-blog.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { regex } from '../../../config/regex';
import { DataService } from '@app/shared-services/data.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit, OnDestroy {
  blogDetail: any = [];
  blogData:any=[];
  slug: any;
  author: any;
  embeddedUrl: any = "";
  categories: any;
  blogCategory: any;
  regex_url = regex.regex_url;
  breadCrumb: any;
  isBlogEditable: boolean = false; 
  private _onDestroy = new Subject<void>();
  navigationSubscription: any;

  constructor(
    private createBlogQueryService: CreateBlogQueryService,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
			// If it is a NavigationEnd event re-initalise the component
			if (e instanceof NavigationEnd) {
				this.reloadComponent();
			}
		});
  }
  ngOnInit() {
  }

  reloadComponent() {
    this.slug = this.route.snapshot.params.slug;
    this.blogData = [];
    this.getBlogDetail(this.slug);
    this.getRecommendedBlog(this.slug);
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
        isActive: true
    }];
  }

  getBlogDetail(blogSlug) {
    const param = {
      id: blogSlug
    };

    this.createBlogQueryService.getBlogDetail(param).valueChanges.subscribe(res => {
      this.blogDetail = res['data']['blog'];
      let category = [];
      let cat = this.blogDetail.categories;
      cat.map(res => {
        category.push(res.category);
      })
      this.blogCategory = category;
      this.author = this.blogDetail.authors;
      // this.embeddedUrl = this.blogDetail.embeddedUrl.replace(/(width=")\d+("\W+height=")\d+/, ' width="700" height="400" ');
      this.getEmbeddedUrl();
      this.getCategory();
      this.updateEditBlogFlag();
    })
  }

  getEmbeddedUrl(){
    const str=`${this.blogDetail.embeddedUrl}`;  // converting original embeddedUrl into a string  
    const newEmbeddedUrl=str.match(this.regex_url); //checking weather original embeddedUrl matches with regex and storing the match value
    this.embeddedUrl=newEmbeddedUrl[0]; //accesing newembeddedUrl
    
    //embeddedUrl contains width remove it.
    if(this.embeddedUrl.includes("width")) {
      this.embeddedUrl = this.embeddedUrl.replace(/(width=")\d+"/,'');
    }
    //embeddedUrl contains height remove it.
    if(this.embeddedUrl.includes("height")) {
      this.embeddedUrl = this.embeddedUrl.replace(/(height=")\d+"/,'');
    }

    let startString=this.embeddedUrl.slice(0,7);
    let embedSize=' width="700" height="400" ';
    let endString=this.embeddedUrl.slice(8);

    this.embeddedUrl=startString+embedSize+endString; //concatenating the above result.


  }

  getCategory() {
    this.createBlogQueryService.getCategoryBlogs().valueChanges.subscribe(res => {
      this.categories = res.data.categories;
      this.categories.forEach(element => {
        element['isHighlight'] = this.blogCategory.includes(element['category']) ? true : false;
      });
    });
  }

  getRecommendedBlog(blogID){
    this.blogData.length=0;
    this.createBlogQueryService.getRecommendedBlogs(blogID).subscribe(res=>{
      for(let i=0;i<res["data"].length;i++){
        this.blogData.push(res["data"][i]); 
      }
    });
  }

  updateEditBlogFlag() {
    const profileId = this.dataService.getProfileId();
    let author = _.find(this.author, (data) => { return data.id === profileId });

    this.isBlogEditable = !!(author || localStorage.getItem('userRole') === 'admin');
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
    if (this.navigationSubscription) {
			this.navigationSubscription.unsubscribe();
		}
  }
}
