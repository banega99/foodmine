import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food.service';
import { Tag } from 'src/app/shared/models/Tags';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tags: Tag[] = [];

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    // let tagsObservable: Observable<Tag[]>
    this.foodService.getAllTags()
    .subscribe(tags => this.tags = tags)
  }

}
