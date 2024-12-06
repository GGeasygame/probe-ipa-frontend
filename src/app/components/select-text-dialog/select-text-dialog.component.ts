import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Text} from '../../domain/Text';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';

@Component({
  selector: 'app-select-text-dialog',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderCellDef,
    MatCellDef
  ],
  templateUrl: './select-text-dialog.component.html',
  styleUrl: './select-text-dialog.component.css'
})
export class SelectTextDialogComponent {
  displayedColumns: string[] = ['title', 'text'];

  constructor(
    public dialogRef: MatDialogRef<SelectTextDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { texts: Text[] }
  ) {
  }

  onRowClick(row: Text): void {
    this.dialogRef.close(row);
  }
}
