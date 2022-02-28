import { Component, OnInit } from '@angular/core';
import { GetService } from '../services/get.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-profile-hub',
  templateUrl: './profile-hub.component.html',
  styleUrls: ['./profile-hub.component.css']
})
export class ProfileHubComponent implements OnInit {
  profile:any = {};
  loaded:boolean = false;
  constructor(private getService: GetService, private postService: PostService) { }

  ngOnInit(): void {
    let customerID = localStorage.getItem("customerID") || "";
    let sessionID = localStorage.getItem("sessionID");
    let username = localStorage.getItem("username");
    if(!customerID || !sessionID || !username){
      localStorage.removeItem("username");
      localStorage.removeItem("sessionID");
      localStorage.removeItem("customerID");
      window.location.replace("/");
    }
    this.postService.getUserData(customerID, {sessionID, customerID, username}).subscribe((data:any) => {
      if(data){
        this.profile = data;
        console.log(this.profile);
        this.loaded = true;
      }
    })
  }

}
