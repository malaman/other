var React = require('react');

export default function Html() {
    return (
        <html>
          <head>
            <title>Another react typescript boilerplate</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css" />
          </head>
          <body>
            <div id="root"></div>
            <script src="/static/bundle.js"></script>
          </body>
        </html>
    );
}
