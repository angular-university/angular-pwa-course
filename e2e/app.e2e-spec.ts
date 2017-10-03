import { AngularSecurityCoursePage } from './app.po';

describe('angular-security-course App', () => {
  let page: AngularSecurityCoursePage;

  beforeEach(() => {
    page = new AngularSecurityCoursePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
