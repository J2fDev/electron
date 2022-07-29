import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TwoFacDialogComponent } from '../../dialogs/two-fac-dialog/two-fac-dialog.component';

@Component({
  selector: 'app-security-data',
  templateUrl: './security-data.component.html',
  styleUrls: ['./security-data.component.css']
})
export class SecurityDataComponent implements OnInit {
  hide = true;

  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
  }
  open2fDialog() {
    const dialogRef = this.dialog.open(TwoFacDialogComponent, {
      width: '31rem',
      height: '24.5rem',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
