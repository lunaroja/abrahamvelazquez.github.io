# Abraham.mx

This is my personal website. It’s generated with Jekyll on GitHub Pages and uses Markdown. The design is a fork of the [Casper Theme](https://github.com/TryGhost/Casper/) from Ghost.

## Build System
To develop locally it uses [Jekyll](http://jekyllrb.com/), [NPM](https://docs.npmjs.com/getting-started/installing-node), [Gulp](http://gulpjs.com/), [LibSass](http://libsass.org/), [Autoprefixer](https://github.com/postcss/autoprefixer) and [BrowserSync](http://www.browsersync.io/)

```sh
gem install jekyll jekyll-paginate jekyll-gist
npm install --global gulp

npm install && gulp
```

Running jekyll projects on Cloud9 requires this ```jekyll serve -H $IP -P $PORT --baseurl ""``` command in the terminal.
