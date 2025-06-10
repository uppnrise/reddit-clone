import { Article } from './article.model';

describe('Article', () => {
  let article: Article;

  beforeEach(() => {
    article = new Article('Test Title', 'https://example.com/path', 10);
  });

  describe('constructor', () => {
    it('should create an article with all parameters', () => {
      expect(article.title).toBe('Test Title');
      expect(article.link).toBe('https://example.com/path');
      expect(article.votes).toBe(10);
    });

    it('should create an article with default votes when not provided', () => {
      const defaultArticle = new Article('Title', 'https://example.com');
      expect(defaultArticle.votes).toBe(0);
    });

    it('should handle null votes parameter', () => {
      const nullVotesArticle = new Article('Title', 'https://example.com', null as unknown as number);
      expect(nullVotesArticle.votes).toBe(0);
    });

    it('should handle undefined votes parameter', () => {
      const undefinedVotesArticle = new Article('Title', 'https://example.com', undefined);
      expect(undefinedVotesArticle.votes).toBe(0);
    });
  });

  describe('voteUp', () => {
    it('should increment votes by 1', () => {
      const initialVotes = article.votes;
      const result = article.voteUp();

      expect(article.votes).toBe(initialVotes + 1);
      expect(result).toBe(false);
    });

    it('should work multiple times', () => {
      article.voteUp();
      article.voteUp();
      article.voteUp();

      expect(article.votes).toBe(13);
    });
  });

  describe('voteDown', () => {
    it('should decrement votes by 1', () => {
      const initialVotes = article.votes;
      const result = article.voteDown();

      expect(article.votes).toBe(initialVotes - 1);
      expect(result).toBe(false);
    });

    it('should work multiple times', () => {
      article.voteDown();
      article.voteDown();
      article.voteDown();

      expect(article.votes).toBe(7);
    });

    it('should allow negative votes', () => {
      const zeroVotesArticle = new Article('Title', 'https://example.com', 0);
      zeroVotesArticle.voteDown();

      expect(zeroVotesArticle.votes).toBe(-1);
    });
  });

  describe('domain', () => {
    it('should extract domain from https URL', () => {
      const httpsArticle = new Article('Title', 'https://github.com/user/repo');
      expect(httpsArticle.domain()).toBe('github.com');
    });

    it('should extract domain from http URL', () => {
      const httpArticle = new Article('Title', 'http://stackoverflow.com/questions/123');
      expect(httpArticle.domain()).toBe('stackoverflow.com');
    });

    it('should extract domain with path', () => {
      const pathArticle = new Article('Title', 'https://docs.angular.io/guide/testing');
      expect(pathArticle.domain()).toBe('docs.angular.io');
    });

    it('should extract domain with query parameters', () => {
      const queryArticle = new Article('Title', 'https://www.google.com/search?q=angular');
      expect(queryArticle.domain()).toBe('www.google.com');
    });

    it('should handle subdomain', () => {
      const subdomainArticle = new Article('Title', 'https://api.github.com/repos');
      expect(subdomainArticle.domain()).toBe('api.github.com');
    });

    it('should return null for invalid URLs', () => {
      const invalidArticle = new Article('Title', 'not-a-url');
      expect(invalidArticle.domain()).toBe(null);
    });

    it('should return null for URLs without protocol', () => {
      const noProtocolArticle = new Article('Title', 'github.com/user/repo');
      expect(noProtocolArticle.domain()).toBe(null);
    });

    it('should handle empty URL', () => {
      const emptyArticle = new Article('Title', '');
      expect(emptyArticle.domain()).toBe(null);
    });

    it('should handle malformed URLs gracefully', () => {
      const malformedArticle = new Article('Title', 'https://');
      expect(malformedArticle.domain()).toBe(null);
    });
  });

  describe('voting combination', () => {
    it('should handle mixed voting correctly', () => {
      article.voteUp();
      article.voteUp();
      article.voteDown();
      article.voteUp();

      expect(article.votes).toBe(12); // 10 + 1 + 1 - 1 + 1
    });
  });
});
