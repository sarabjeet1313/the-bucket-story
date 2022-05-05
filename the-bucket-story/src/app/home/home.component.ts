import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  buckets: Array<any> = [];
  fromBucketValue: number;
  toBucketValue: number;
  quantityInput: number;
  errorFlag: boolean = false;
  error: string;
  noteFlag: boolean = false;
  note: string;

  constructor() { }

  ngOnInit(): void {
    this.buckets = [
      { id: 0, name: 'Bucket-0', capacity: 10, currentLevel: 10, remainingLevel: 0,},
      { id: 1, name: 'Bucket-1', capacity: 10, currentLevel: 10, remainingLevel: 0 },
      { id: 2, name: 'Bucket-2', capacity: 4, currentLevel: 0, remainingLevel: 4},
      { id: 3, name: 'Bucket-3', capacity: 5, currentLevel: 0, remainingLevel: 5},
    ]
  }

  updateData() {
    let fromBucket: number;
    let toBucket: number;
    this.errorFlag = false;

    this.buckets.forEach((bucket) => {

      console.log(bucket.id + "===" + this.fromBucketValue + "===" + this.toBucketValue);
      if (bucket.id == this.fromBucketValue) {

        if (bucket.currentLevel < 1) {
          this.errorFlag = true;
          this.error = "Bucket does not have water to transfer."
          return;
        }
        else {
          fromBucket = bucket.id;
        }
      }

      if (bucket.id == this.toBucketValue) {
        console.log("Inside If");
        if (bucket.remainingLevel == 0) {
          this.errorFlag = true;
          this.error = "Bucket does not have space to have water."
          return;
        }
        else {
          console.log("Inside else");
          toBucket = bucket.id;
        }
      }
    })

      if (!this.errorFlag) {
        console.log(fromBucket + "===" + toBucket);

        let waterToTransfer = 0;
        if (this.buckets[fromBucket].currentLevel > this.buckets[toBucket].remainingLevel) {
          waterToTransfer = this.buckets[toBucket].remainingLevel;
        }
        else {
          waterToTransfer = this.buckets[fromBucket].currentLevel;
        }
      
        this.buckets[fromBucket].currentLevel -= waterToTransfer;
        this.buckets[fromBucket].remainingLevel += waterToTransfer;

        this.buckets[toBucket].currentLevel += waterToTransfer;
        this.buckets[toBucket].remainingLevel -= waterToTransfer;
      }

  }

  submit() {
    if (this.buckets[2].currentLevel == 2 || this.buckets[3].currentLevel == 2) {
      this.noteFlag = true;
      this.note = "Congratulations !!! you cleared it."
    }
  }
}
