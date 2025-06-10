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
});
