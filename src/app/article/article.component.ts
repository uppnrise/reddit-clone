import { Component, HostBinding, input, ChangeDetectionStrategy, inject, ChangeDetectorRef } from '@angular/core';
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

  private readonly cdr = inject(ChangeDetectorRef);

  voteUp(): boolean {
    this.article().voteUp();
    this.cdr.markForCheck(); // Manually trigger change detection
    return false;
  }

  voteDown(): boolean {
    this.article().voteDown();
    this.cdr.markForCheck(); // Manually trigger change detection
    return false;
  }
}
