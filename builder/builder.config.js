import pkg from '../package.json'

const src = 'src';
const dist = 'public';
const styles = 'styles';
const scripts = 'scripts';
const templates = 'templates';

const config = {
  path: {
    src: `./${src}/`,
    dist: `./${dist}/`
  },

  browsers: 'last 2 versions',

  sourcemaps: {
    dist: 'maps',
    url: ''
  },

  styles: {
    src: `./${src}/${styles}`,
    entry: 'common.styl',
    dist: `./${dist}/assets/${styles}`
  },

  templates: {
    src: `./${src}/${templates}`,
    pages: /templates[\\\/]pages/,
    prettify: {
      brace_style: 'expand',
      indent_size: 1,
      indent_char: '\t',
      indent_inner_html: true,
      preserve_newlines: true
    },
    data: {
      jv0: 'javascript:void(0);',
      projectName: pkg.name,
      projectVersion: pkg.version
    }
  }
};

export default config;
