import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  username = "";
  password = "";

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  signUp() {
  }
  
  login() {
    // this.postService.signUpUser({username: this.username, password: this.password})
    console.log(this.username, this.password)
  }

}
