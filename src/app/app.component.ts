import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { Article } from './article/article.model';
import { ArticleComponent } from './article/article.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [ArticleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  articles = signal<Article[]>([
    new Article('Angular', 'http://angular.io', 3),
    new Article('Fullstack', 'http://fullstack.io', 2),
    new Article('Angular Homepage', 'http://angular.io', 1),
  ]);

  sortedArticles = computed(() => this.articles().sort((a, b) => b.votes - a.votes));

  addArticle(title: HTMLInputElement, link: HTMLInputElement): boolean {
    const newArticle = new Article(title.value, link.value, 0);
    this.articles.update((articles) => [...articles, newArticle]);

    title.value = '';
    link.value = '';
    return false;
  }
}
