import { Component, HostBinding, input, output, ChangeDetectionStrategy } from '@angular/core';
import { Article } from './article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent {
  @HostBinding('attr.class')
  cssClass = 'row';

  article = input.required<Article>();
  voteChange = output<{ article: Article; delta: number }>();

  voteUp(): boolean {
    this.voteChange.emit({ article: this.article(), delta: 1 });
    return false;
  }

  voteDown(): boolean {
    this.voteChange.emit({ article: this.article(), delta: -1 });
    return false;
  }
}
