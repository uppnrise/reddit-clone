import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticleComponent } from './article.component';
import { Article } from './article.model';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  let testArticle: Article;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArticleComponent], // Using imports for standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    
    // Create test article
    testArticle = new Article('Test Article', 'http://test.com', 5);
    
    // Set the input signal
    fixture.componentRef.setInput('article', testArticle);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display article information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    
    expect(compiled.querySelector('.value')?.textContent?.trim()).toBe('5');
    expect(compiled.querySelector('a.ui.large.header')?.textContent?.trim()).toBe('Test Article');
    expect(compiled.querySelector('a.ui.large.header')?.getAttribute('href')).toBe('http://test.com');
    expect(compiled.querySelector('.meta')?.textContent).toContain('test.com');
  });

  it('should have CSS class row', () => {
    expect(component.cssClass).toBe('row');
  });

  it('should vote up', () => {
    const initialVotes = testArticle.votes;
    const result = component.voteUp();
    
    expect(testArticle.votes).toBe(initialVotes + 1);
    expect(result).toBe(false); // preventDefault behavior
  });

  it('should vote down', () => {
    const initialVotes = testArticle.votes;
    const result = component.voteDown();
    
    expect(testArticle.votes).toBe(initialVotes - 1);
    expect(result).toBe(false); // preventDefault behavior
  });

  it('should handle vote up click', () => {
    spyOn(component, 'voteUp').and.returnValue(false);
    
    const upvoteLinks = fixture.nativeElement.querySelectorAll('a[href]') as NodeListOf<HTMLAnchorElement>;
    const upvoteLink = Array.from(upvoteLinks).find((link: HTMLAnchorElement) => 
      link.textContent?.includes('upvote')
    );
    
    expect(upvoteLink).toBeTruthy();
    upvoteLink!.click();
    
    expect(component.voteUp).toHaveBeenCalled();
  });

  it('should handle vote down click', () => {
    spyOn(component, 'voteDown').and.returnValue(false);
    
    const downvoteLinks = fixture.nativeElement.querySelectorAll('a[href]') as NodeListOf<HTMLAnchorElement>;
    const downvoteLink = Array.from(downvoteLinks).find((link: HTMLAnchorElement) => 
      link.textContent?.includes('downvote')
    );
    
    expect(downvoteLink).toBeTruthy();
    downvoteLink!.click();
    
    expect(component.voteDown).toHaveBeenCalled();
  });

  it('should update votes display when article changes', () => {
    // Test using the component's vote methods directly
    spyOn(component, 'voteUp').and.callThrough();
    
    // Trigger the voteUp method via click
    const upvoteLink = fixture.nativeElement.querySelector('a[href]:has(i.arrow.up.icon)');
    expect(upvoteLink).toBeTruthy();
    upvoteLink!.click();
    
    // Verify the method was called
    expect(component.voteUp).toHaveBeenCalled();
    
    // Since ChangeDetectorRef.markForCheck() should trigger update
    fixture.detectChanges();
    
    const voteDisplay = fixture.nativeElement.querySelector('.value');
    expect(voteDisplay?.textContent?.trim()).toBe('6');
  });
});
