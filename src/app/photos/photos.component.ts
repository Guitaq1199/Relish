import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../photos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    FormsModule],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css'
})
export class PhotosComponent implements OnInit {
  photos: any[] = [];
  title: string | null = null;
  album:string | null = null;
  userEmail: string | null = null;
  limit:number | null = null;
  offset: number | null = null;
  selectedPhoto: any = null;

  constructor(private photoService: PhotosService) { }

  ngOnInit(): void {
  }
  fetchPhotos(): void {
    const titleParam = this.title || undefined;
    const albumParam = this.album || undefined;
    const userEmailParam = this.userEmail || undefined;
    const limitParam = this.limit || undefined;
    const offsetParam = this.offset || undefined;

    this.photoService.getPhotos(titleParam, albumParam,userEmailParam,offsetParam,limitParam).subscribe(
      (data: any[]) => {
        this.photos = data;
      },
      error => {
        console.error('Error fetching photos', error);
      }
    );
  }

}
