import { ProfilerPage } from './app.po';

describe('profiler App', () => {
  let page: ProfilerPage;

  beforeEach(() => {
    page = new ProfilerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
