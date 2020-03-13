import { Component, OnInit, OnDestroy } from '@angular/core';
import { CreateBlogQueryService } from '../../services/create-blog.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit, OnDestroy {
  showloader: Boolean = false;
  blogData: any[] = [];
  blogRequest = {
    start: 0,
    limit: 20
  }
  lastScroll = window.innerHeight + window.scrollY;
  isDataFound = true;
  isFetching = false;
  parameter: any;
  slug: any;
  categories: any;
  categoryBlogs = [];
  categoryId = [];
  catWiseBlog = [];
  breadcrumb: string;
  categoryName: any;
  breadCrumb: any;
  simpleItems = [];
  filteredMode = false;
  filteredBlogData: any[] = [];
  searchText = '';
  isFocus = false;
  dropdownContent: any;
  count = 0;
  showNoResult: boolean=false;
  private _onDestroy = new Subject<void>();

  constructor(
    private createBlogQueryService: CreateBlogQueryService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.showloader = false;
    this.breadcrumb = "Blogs";
    this.slug = this.route.snapshot.params.category;
    if (this.slug) {
      this.getCategoriWiseBlogs(this.slug);
    } else {
      this.getBlogData(this.blogRequest, false);
    }
    this.breadCrumb = [
      {
        label: 'Home',
        url: '/home',
        isActive: false
      }, {
        label: 'Blogs',
        url: '/blog',
        isActive: true
      }];
    this.simpleItems = ['Blog title', 'Authors'];

  }

  getCategoriWiseBlogs(blogSlug) {
    const param = {
      id: blogSlug
    };
    this.createBlogQueryService.getCategoryBlogsById(param).valueChanges.subscribe(res => {
      this.blogData = res.data.category.blogs;
      this.categoryName = res.data.category.category;
      this.breadcrumb = "Blogs : " + this.categoryName;
    })
  }

  getBlogData(value, isScroll, fetch?) {
    if (typeof (fetch) !== 'undefined') {
      this.isFetching = !fetch;
    }
    this.createBlogQueryService.getBlog(value).valueChanges.subscribe(res => {
      this.filteredMode = false;
      this.showloader = false;
      this.blogData = isScroll ? [...this.blogData, ...res.data.nonFeatured] : res.data.featured.concat(res.data.nonFeatured);
      if (!res.data.nonFeatured.length) {
        this.isDataFound = false
      }
      this.isFetching = false;
    });
  }

  onFocus(event) {
    this.isFocus = true;
    this.dropdownContent = event;
  }

  filterData(params) {
    this.isFocus = true;
    if (this.searchText.length >= 3) {
      this.showNoResult = false;
      this.createBlogQueryService.filterBlogs(params).valueChanges.subscribe((blogs: any) => {
        this.filteredBlogData = blogs.data.blogs;
        this.filteredMode = true;
        this.count = this.filteredBlogData.length;
        if (!this.count) {
          this.showNoResult = true;
          this.showloader = false;
        }
      })
    } else if (this.searchText.length === 0) {
      this.showloader = true;
      this.filteredMode = false;
    }
  }

  searchInput() {
    let title_params = {
      "where": { "name_contains": this.searchText }
    }
    let authors_params = {
      "where": { authors: { "name_contains": this.searchText } }
    }
    if (this.dropdownContent === 'Blog title') {
      this.filterData(title_params);
      this.showloader = false;
    } else if (this.dropdownContent === 'Authors') {
      this.filterData(authors_params);
      this.showloader = false;
    } else {
      this.isFocus = false;
    }
  }

  onClose() {
    this.showNoResult = false;
    this.isFocus = false;
    this.searchText = '';
    this.filteredMode = false;
    this.showloader = true;
  }

  onScroll(e) {
    if (!this.isFetching) {
      const footEl = document.getElementById('footer');
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - footEl.offsetHeight) {
        this.lastScroll = window.innerHeight + window.scrollY;
        if (this.blogData && this.isDataFound) {
          this.blogRequest.start += 20;
          this.showloader = true;
          this.getBlogData(this.blogRequest, true, this.isFetching);
        }
      }
    }
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
