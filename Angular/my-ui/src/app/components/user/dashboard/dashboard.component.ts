import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { firstValueFrom } from 'rxjs';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

user:any
users :any= []
isLoading:boolean=false;
displayedColumns: string[] = ['username', 'email', 'role', 'actions'];
constructor(private userService:UserService, private router: Router) {

}
ngOnInit(): void {
  this.fetchUserDetails()
}
async fetchUserDetails() {
  const user: any = JSON.parse(sessionStorage.getItem('user') || '{}');
  this.isLoading = true; 
  try {
    this.user = await firstValueFrom(this.userService.fetchUser(user?.userId));
    if (this.user.role === "Admin") {
      const res = await firstValueFrom(this.userService.fetchAllUser());
      this.users = res.data;
    }
  } catch (error: any) {
    const errorMessage = error?.error?.message || 'Something went wrong';
    alert(errorMessage);
  } finally {
    this.isLoading = false;
  }
}
showUserDetails(){
  this.router.navigate(['user/user-record']);
}
viewUser(u: any) {
  console.log('Viewing user:', u);
}
toggleUserStatus(user: any, isActive: boolean) {
  this.isLoading=true
  const newStatus = isActive ? 'Active' : 'Deactive';
  this.userService.updateUserStatus(user._id, newStatus).subscribe({
    next: (res) => {
      user.status = newStatus;
      this.isLoading=false
    },
    error: (err) => {
      this.isLoading=false
      alert(err?.error?.message || 'Failed to update status');
    }
  });
}
deleteUser(u: any) {
  console.log(u,"User Data")
  this.router.navigate(['user/user-record'], { queryParams: { id: u._id } });
}
}
