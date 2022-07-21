# screenshot-win

> Capture a screenshot of your local machine

* Multi/Cross Platform
  * Linux: Comming soon!
  * OSX: No dependencies required!
  * Windows: No dependencies required!
* Promise based API
* JPG output (by default)

## Install
    $ npm install --save screenshot-win
## Usage

```
const screenshot_win = require('screenshot-win')

screenshot_win().then((data) => {
   console.log(data); 
});
```
WITH Parameters
```
const screenshot_win = require('screenshot-win')

screenshot_win("yourpath/filename","format").then((data) => {
   console.log(data); 
});
```
* [Note:] Allow file format (jpg,png only)
## Licence

MIT &copy; [Basant Singh](https://github.com/basantsd)

## Maintainers
*[Basant Singh](https://github.com/basantsd)