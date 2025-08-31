import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-records',
  templateUrl: './user-records.component.html',
  styleUrls: ['./user-records.component.css']
})
export class UserRecordsComponent {
  user: any;
  permissions:any=[];
  isLoading: boolean = false;
  displayedColumns: string[] = ['section', 'create', 'read', 'update', 'delete'];
  constructor(private userService:UserService, private router: Router,private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.fetchUserDetails(params['id']);
      } else {
        const user: any = JSON.parse(sessionStorage.getItem('user') || '{}');
        this.fetchUserDetails(user.userId);
      }
    });
  }
  fetchUserDetails(userId?:any){
    this.isLoading=true
    this.userService.fetchUser(userId).subscribe({
      next: (res) => {
       this.user=res
       this.isLoading=false
       this.permissions=  this.getPermissionsArray(res.roleId.permissions)
      },
      error: (error) => {
        this.isLoading=false
        const errorMessage = error?.error?.message || 'Something went wrong';
        alert(errorMessage);
      }
    });
  }

  getPermissionsArray(permissionsObj: any) {
    return Object.keys(permissionsObj).map(key => ({
      section: key,
      perms: permissionsObj[key]
    }));
  }
}

