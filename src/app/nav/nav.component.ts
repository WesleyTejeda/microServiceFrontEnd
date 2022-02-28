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
  loggedIn = false;
  customerID = "";
  serverMessage:string = "";
  signUpData:any = {
    firstName: "",
    lastName: "",
    birthdate: "",
    email: "",
    username: "",
    password: ""
  };

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    //Check if logged in
    let username = localStorage.getItem("username");
    let sessionID = localStorage.getItem("sessionID");
    this.customerID = localStorage.getItem("customerID") || "";
    this.postService.authenticate({username,sessionID}).subscribe((res:any) => {
      console.log(res);
      if(!res.error){
        this.loggedIn = true;
      } else {
        localStorage.removeItem("sessionID");
        localStorage.removeItem("username");
        localStorage.removeItem("customerID");
      }
    })
  }

  signUp() {
    this.postService.signUpUser(this.signUpData).subscribe((res:any) => {
      console.log(res)
      if(res.sessionID){
        localStorage.setItem("username", res.username);
        localStorage.setItem("sessionID", res.sessionID);
        localStorage.setItem("customerID", res.id);
        window.location.replace("/profile");
      } else {
        this.serverMessage = res.error;
      }
    })
  }
  
  login() {
    if(this.username === "" || this.password === ""){
      return
    }
    console.log(this.username, this.password);
    this.postService.logUserIn({username: this.username, password: this.password}).subscribe((res:any) => {
      console.log(res);
      if(!res.error){
        this.loggedIn = true;
        this.customerID = res.customerID;
        localStorage.setItem("username", this.username);
        localStorage.setItem("sessionID", res.sessionID);
        localStorage.setItem("customerID", res.customerID);
        window.location.replace("/profile");
      }
    })
  }

  signOut() {
    localStorage.removeItem("username");
    localStorage.removeItem("sessionID");
    localStorage.removeItem("customerID");
    window.location.replace("/");
  }

}
