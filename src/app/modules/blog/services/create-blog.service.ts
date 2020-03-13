import { Injectable } from '@angular/core';
import { Apollo ,QueryRef, Query} from 'apollo-angular';
import { createBlog, updateBlog} from '../store/queries';
import {  getBlogAuthors, getBlogCoe, getBlogDetail, getEachBlogDetail, getCategoryBlogs, getCategoryBlogsById, getCheckBoxes,filterBlogs } from '../store/queries/create-blog.query'
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable()
export class CreateBlogQueryService {

  constructor( private _apollo: Apollo,
    private https : HttpClient) {}

    createBlog(params){
      return this._apollo.use('client2').mutate({
        mutation:createBlog,
        variables:params
      })
    }

    updateBlog(params){
      return this._apollo.use('client2').mutate({
        mutation:updateBlog,
        variables:params
      })
    }

    getBlogAuthors():QueryRef<any>{
      return this._apollo.use('client2').watchQuery({
        query: getBlogAuthors,
      })
    }

    getBlogCoe():QueryRef<any>{
      return this._apollo.use('client2').watchQuery({
        query:getBlogCoe,
      })
    };

    getBlog(params):QueryRef<any>{
      return this._apollo.use('client2').watchQuery({
        query:getBlogDetail,
        variables:params,
        fetchPolicy: "no-cache"
      })
    }

    getBlogDetail(params):QueryRef<any>{
      return this._apollo.use('client2').watchQuery({
        query:getEachBlogDetail,
        variables:params,
        fetchPolicy:"no-cache"
      })
    }
    getCategoryBlogs():QueryRef<any>{
      return this._apollo.use('client2').watchQuery({
        query:getCategoryBlogs,
        fetchPolicy:"no-cache"
      })
    }

    getCheckBoxes():QueryRef<any>{
      return this._apollo.use('client2').watchQuery({
        query:getCheckBoxes
      })
    }

    getCategoryBlogsById(params):QueryRef<any>{
      return this._apollo.use('client2').watchQuery({
        query:getCategoryBlogsById,
        variables:params
      })
    }

    filterBlogs(params):QueryRef<any>{
      return this._apollo.use('client2').watchQuery({
        query:filterBlogs,
        variables: params
      })
    }

    uploadImage(formdata){
      return this.https.post(`${environment.newBaseUrl}upload`, formdata);
    }

    getRecommendedBlogs(blogId){
      return this.https.get(`${environment.newBaseUrl}recommendation/blog/${blogId}?_limit=3`);
    }

    getRecommendedTags(data){
      return this.https.post(`${environment.newBaseUrl}recommendation/tag/`, data);
    }
}