import {Component, HostBinding, input, OnInit} from '@angular/core';
import {Article} from "./article.model";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  standalone: true
})
export class ArticleComponent implements OnInit {

  @HostBinding('attr.class')
  cssClass = 'row';

  article = input.required<Article>();

  constructor() {
    // No need for operations here anymore with signals
  }

  voteUp(): boolean {
    this.article().voteUp();
    return false;
  }

  voteDown(): boolean {
    this.article().voteDown();
    return false;
  }

  ngOnInit(): void {
  }

}
