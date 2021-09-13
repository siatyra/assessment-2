const { parseHTML, parseCSS, readFile } = require('../setup.js');
const html = parseHTML(readFile('../index.html'));
const css = parseCSS(readFile('../styles/main.css'));
const readMe = readFile('../README.md');
const badgeRegex = /\[\!\[Netlify Status]\(https:\/\/api\.netlify\.com\/api\/v1\/badges\/[-a-f0-9]+\/deploy-status\)]\([^)]+\)/g;

// HTML tests
describe('index.html', () => {
  test('file found', () => {
    expect(html).toBeTruthy();
  });

  test('contains <!DOCTYPE html> declaration', () => {
    expect(html.childNodes[0].rawText.match(/^<!DOCTYPE html>/)).toBeTruthy();
  });

  test('<html /> element contains "lang" attribute', () => {
    expect(html.querySelectorAll('html').length).toBe(1);
    expect(html.querySelector('html').getAttribute('lang')).toBeTruthy();
  });

  test('contains exactly one <title /> element', () => {
    expect(html.querySelectorAll('head title').length).toBe(1);
  });

  test('contains exactly one <meta charset="" /> element', () => {
    expect(html.querySelectorAll('head meta[charset]').length).toBe(1);
  });

  test('contains exactly one <link /> element pointing to the "styles/main.css" stylesheet', () => {
    expect(html.querySelectorAll('head link[rel=stylesheet]').length).toBeGreaterThan(0);
    expect(
      html.querySelectorAll('head link[rel=stylesheet]')
      .filter(link => link.getAttribute('href').indexOf('styles/main.css') >= 0).length
    ).toBe(1);
  });

  test('contains exactly one <link /> element pointing to a favicon', () => {
    expect(html.querySelectorAll('head link[rel=icon]').length).toBe(1);
  });

  test('contains exactly one <h1 /> element', () => {
    expect(html.querySelectorAll('body h1').length).toBe(1);
  });

  test('contains exactly one <section /> element with the class name "about-me"', () => {
    expect(html.querySelectorAll('body section.about-me').length).toBe(1);
  });

  test('contains exactly one <img /> element with the class name "profile-img"', () => {
    expect(html.querySelectorAll('body section.about-me').length).toBe(1);
  });

  test('contains exactly one <ul /> element with the class name "projects" and multiple projects listed', () => {
    expect(html.querySelectorAll('body ul.projects').length).toBe(1);
    expect(html.querySelectorAll('body ul.projects li').length).toBeGreaterThan(1);
  });

  test('contains at least one <ul /> element with the class name "social-media" and multiple social accounts listed, inside a <footer /> element', () => {
    expect(html.querySelectorAll('body footer ul.social-media').length).toBeGreaterThan(0);
    expect(html.querySelectorAll('body footer ul.social-media li').length).toBeGreaterThan(1);
  });
});

// CSS tests
describe('styles/main.css', () => {
  test('file found', () => {
      expect(css).toBeTruthy();
  });

  test('imports at least one font', () => {
      expect(
        css.stylesheet.rules.filter(
          rule => rule.type == 'font-face' &&
          typeof rule.declarations.find(declaration => declaration.property === 'font-family') !== 'undefined' &&
          typeof rule.declarations.find(declaration => declaration.property === 'src' && declaration.value.indexOf('url') >= 0) !== 'undefined'
        ).length
      ).toBeGreaterThan(0);
  });
});

describe('README.md', () => {
  test('status badge found', () => {
    expect(readMe.match(badgeRegex).length).toBeGreaterThan(0);
  });
});
