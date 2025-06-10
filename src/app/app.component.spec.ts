import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent], // Using imports for standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial articles', () => {
    expect(component.articles().length).toBe(3);
    expect(component.articles()[0].title).toBe('Angular');
    expect(component.articles()[1].title).toBe('Fullstack');
    expect(component.articles()[2].title).toBe('Angular Homepage');
  });

  it('should have sorted articles by votes', () => {
    const sortedArticles = component.sortedArticles();
    expect(sortedArticles[0].votes).toBe(3); // Angular
    expect(sortedArticles[1].votes).toBe(2); // Fullstack
    expect(sortedArticles[2].votes).toBe(1); // Angular Homepage
  });

  it('should add new article', () => {
    const titleInput = { value: 'Test Title' } as HTMLInputElement;
    const linkInput = { value: 'http://test.com' } as HTMLInputElement;

    const initialLength = component.articles().length;
    component.addArticle(titleInput, linkInput);

    expect(component.articles().length).toBe(initialLength + 1);
    const newArticle = component.articles()[component.articles().length - 1];
    expect(newArticle.title).toBe('Test Title');
    expect(newArticle.link).toBe('http://test.com');
    expect(newArticle.votes).toBe(0);
    
    // Check that inputs are cleared
    expect(titleInput.value).toBe('');
    expect(linkInput.value).toBe('');
  });

  it('should render form elements', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('form')).toBeTruthy();
    expect(compiled.querySelector('input[name="title"]')).toBeTruthy();
    expect(compiled.querySelector('input[name="link"]')).toBeTruthy();
    expect(compiled.querySelector('button')).toBeTruthy();
  });

  it('should render article components', () => {
    const articleElements = fixture.debugElement.queryAll(By.css('app-article'));
    expect(articleElements.length).toBe(3);
  });

  it('should handle vote changes and maintain sorting', () => {
    const initialArticles = component.articles();
    const articleToVote = initialArticles[2]; // Angular Homepage (1 vote)
    
    // Vote up the lowest voted article
    component.voteForArticle(articleToVote, 1);
    
    // Check that the article was updated
    const updatedArticles = component.articles();
    const updatedArticle = updatedArticles.find(a => a.title === 'Angular Homepage');
    expect(updatedArticle?.votes).toBe(2);
    
    // Check that sorting is maintained
    const sortedArticles = component.sortedArticles();
    expect(sortedArticles[0].votes).toBeGreaterThanOrEqual(sortedArticles[1].votes);
    expect(sortedArticles[1].votes).toBeGreaterThanOrEqual(sortedArticles[2].votes);
  });

  it('should handle vote down', () => {
    const initialArticles = component.articles();
    const articleToVote = initialArticles[0]; // Angular (3 votes)
    
    // Vote down the highest voted article
    component.voteForArticle(articleToVote, -1);
    
    // Check that the article was updated
    const updatedArticles = component.articles();
    const updatedArticle = updatedArticles.find(a => a.title === 'Angular');
    expect(updatedArticle?.votes).toBe(2);
  });

  it('should create new article instances when voting', () => {
    const initialArticles = component.articles();
    const originalArticle = initialArticles[0];
    
    component.voteForArticle(originalArticle, 1);
    
    const updatedArticles = component.articles();
    const updatedArticle = updatedArticles[0];
    
    // Should be a new instance (immutable update)
    expect(updatedArticle).not.toBe(originalArticle);
    expect(updatedArticle.title).toBe(originalArticle.title);
    expect(updatedArticle.link).toBe(originalArticle.link);
    expect(updatedArticle.votes).toBe(originalArticle.votes + 1);
  });
});
