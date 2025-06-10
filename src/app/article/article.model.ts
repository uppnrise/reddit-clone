export class Article {
  title: string;
  link: string;
  votes: number;

  constructor(title: string, link: string, votes?: number) {
    this.title = title;
    this.link = link;
    this.votes = votes ?? 0;
  }

  voteUp(): boolean {
    this.votes += 1;
    return false;
  }

  voteDown(): boolean {
    this.votes -= 1;
    return false;
  }

  /**
   * A utility function that extracts the domain from a URL.
   */
  domain(): string | null {
    try {
      const domainAndPath: string = this.link.split('//')[1];
      const domain = domainAndPath.split('/')[0];
      return domain || null;
    } catch {
      return null;
    }
  }
}
