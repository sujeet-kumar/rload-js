# rload-js
Promise based resource loader for JS and CSS

Usage Examples:

```javascript
rLoad.css('//www.w3schools.com/w3css/4/w3.css', {media: 'all'}).then(function (uri) {
    console.log('Loaded CSS:');
    console.log(uri);
}).catch(function (err) {
    console.log('Failed CSS:');
    console.log(err);
});

rLoad.js([    
    '//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js',
    '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'
]).then(function (uris) {
    console.log('Loaded JS:');
    console.log(uris);
}).catch(function (err) {
    console.log('Failed JS:');
    console.log(err);
});

//mixed resources like
//this
rLoad.js([
    rLoad.css('//www.w3schools.com/w3css/4/w3.css', {media: 'all'}),
    '//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js',
    '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'
]).then(function (uris) {
    console.log('Loaded Resources:');
    console.log(uris);
}).catch(function (err) {
    console.log('Failed Resources:');
    console.log(err);
});

//or this
rLoad.all([
    rLoad.css('//www.w3schools.com/w3css/4/w3.css', {media: 'all'}),
    rLoad.js('//ajax.googleapis.com/ajax/libs/angularjs/1.5.6/angular.min.js'),
    rLoad.js('//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js')
]).then(function (uris) {
    console.log('Loaded Resources:');
    console.log(uris);
}).catch(function (err) {
    console.log('Failed Resources:');
    console.log(err);
});

//another mixed example
rLoad.all([
    rLoad.css([
        '//www.example.com/css/style1.css',
        '//www.example.com/css/style2.css'
    ]),
    rLoad.js([
        '//www.example.com/js/script1.js',
        '//www.example.com/js/script2.js'
    ])
]).then(function (uris) {
    console.log('Loaded Resources:');
    console.log(uris);
}).catch(function (err) {
    console.log('Failed Resources:');
    console.log(err);
});
```
