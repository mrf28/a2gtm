import { A2gtmPage } from './app.po';

describe('a2gtm App', function() {
  let page: A2gtmPage;

  beforeEach(() => {
    page = new A2gtmPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
