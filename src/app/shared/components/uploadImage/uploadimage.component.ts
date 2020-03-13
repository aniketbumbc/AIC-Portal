import { Component, Input } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
    selector: 'uploadImage',
    templateUrl: './uploadImage.component.html',
    styleUrls: ['./uploadImage.component.scss']
})
export class UploadImageComponent {
    @Input() imageUrl: any;
    croppedImageUrl:any=null;
    errorMsg = "";
    key= false;
    imageUrlData: any;
    isDeletephoto= false;
    isShowCropper= false;
    showCropper= false;
    isPhoto= false;
    imageChangedEvent: any = '';
    croppedImage: any = null;
    fileChangeEvent(event: any): void {
        if (event.target.files && event.target.files[0]) {
            this.imageChangedEvent = event;
            this.isShowCropper = true;
        }
    }
    imageLoaded() {
        this.key = false;
        this.isShowCropper = true;
    }
    loadImageFailed() {
        this.key = true;
        this.isShowCropper = false;
        this.errorMsg = "Only png/jpg/jpeg are allowed. Upload valid image."
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.file;
        const reader = new FileReader();
            reader.readAsDataURL(event.file); 
            reader.onload= ()=> {
                this.croppedImageUrl = reader.result;                
            }
    }
    savePhoto() {
        if (this.croppedImageUrl) {
            this.isDeletephoto = false;
            this.isPhoto = true;
            this.imageUrl = this.croppedImageUrl;
            this.imageUrlData = this.croppedImage;
            this.showCropper = false;
        }
    }
    removePhoto() {
        this.showCropper = true;
        this.imageUrl = null;
        this.isPhoto = false;
        this.isDeletephoto = true;
    }

}