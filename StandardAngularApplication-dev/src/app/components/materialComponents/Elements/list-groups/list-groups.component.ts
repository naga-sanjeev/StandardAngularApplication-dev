import { Component, OnInit ,ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { ApiService } from 'app/shared/services/api.service';

@Component({
  selector: 'app-list-groups',
  templateUrl: './list-groups.component.html',
  styleUrls: ['./list-groups.component.scss']
})
export class ListGroupsComponent implements OnInit {
  
  imageUrls: string[] = []; // To store multiple image URLs
  lastImageUrl: string ;
  url: any; //Angular 11, for stricter type
	msg = "";
	selectedFile: File | null = null;
	
  constructor(private http: HttpClient, private service: ApiService) {}

  ngOnInit(): void {
   
  }
  selectFile(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    var mimeType = event.target.files[0].type;

    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
    }

    this.selectedFile = event.target.files[0];
  }
  uploadImage() {
    if (!this.selectedFile) {
      this.msg = 'You must select an image';
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);

    this.service.postApi(environment.fileUpload, formData).subscribe(
      (response) => {
        console.log('Image uploaded successfully', response);
        this.msg = "Image uploaded successfully";
        alert('Image uploaded successfully');
      },
      (error) => {
        console.error('Error uploading image', error);
        this.msg = "Error uploading image";
      }
    );
  }

}
