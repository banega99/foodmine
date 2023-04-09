import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from '@angular/core'


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  counter = 0
  searchTerm: string = '';
  @Output('keyUp') searchKey = new EventEmitter()
  @ViewChild('s', {static: true})searchInput!: ElementRef<HTMLInputElement>

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { 
  }

  ngOnInit(): void {
    window.counter = 0
    this.activatedRoute.params.subscribe(params => {
      if(params.searchTerm) this.searchTerm = params.searchTerm;
    })
  }

  searchOnTermChange(event: any): void {
    const term = event.target.value
    this.searchKey.emit(term)
  }

  search(term: string): void {
    if(term) this.router.navigateByUrl('/search/' + term)
  }

  // handleBackspace(event: KeyboardEvent): void {
  //   const input = this.searchInput.nativeElement.value
  //   if(event.key === 'S' && input.length == 0) {
  //     event.preventDefault()
  // }}

}
