# Frontend Exercise - Accordion Component
---

This component implements a simple JS/CSS Accordion, which shows only the contents of one section at a time.

### Main Features
  - The accordion is fully implemented in ES6.
  - Generated CSS with Sass (SCSS).
  - Up to 5 different CSS themes available.
  - Component can be created using a set of custom HTML Tags *__<my-accordion>__*, *__<my-fold>__*
  - The sections composing the accordion can be loaded dynamically with Ajax content.

### Tech

* [ES6] - This Standard defines the ECMAScript 2015 general purpose programming language.
* [Sass] - extension of CSS, adding nested rules, variables, mixins, selector inheritance, and more.
* [webpack] - module bundler for modern JavaScript applications.
* [node.js] - evented I/O for the backend.
* [Express] - fast node.js network app framework.
* [NPM] - package manager for JavaScript and the world’s largest software registry.
* [ESLint] - pluggable linting utility for JavaScript and JSX.
* [babel] - support for the latest version of JavaScript through syntax transformers.


### Installation

This Accordion component requires [Node.js](https://nodejs.org/) v6+ and [NPM](https://www.npmjs.com/) v2+ to run. As it is fully written in ES6, [BABEL](https://babeljs.io/) is required as well.

Install the dependencies and start the server.

```sh
$ cd accordion
$ npm install
$ npm start
```

After these steps, the accordion "demo" index page can be accessed in URL:
__http://localhost:3000__

### Usage

Two new custom HTML Tags are provided for the creation of this accordion:
#### <my-accordion>
Wrapper for a new instance of an Accordion component. Will create a definition list __<dl>__ HTML Element.
|     Params      |   Type   |          Description         |
| --------------- | -------- | ---------------------------- |
|   **_color_**   |  String  | CSS theme color. One of **red, green, blue, yellow, gray**.
|  **_animated_** |  String  | Enable CSS transform to animate sections's expand/collapse changes. One of **true, false, 1, 0**.
|    **_title_**  |  String  | Title of accordion. Will be displayed before all component's sections in an **<h3>** element.
|  **_endpoint_** |  String  | Target URL for API REST call (GET). When this paremeter is set, ajax configuration loaded dynamically from sever will overwrite previous shown accordion's attributes.

#### <my-fold>
Wrapper for each section that we want to include into the accordion. Must be always a child node of *__<my-accordion>__* element.
Will create a defintion title __<dt>__ and a definition description __<dd>__ HTML Elements.
|     Params      |   Type   |          Description         |
| --------------- | -------- | ---------------------------- |
|    **_title_**  |  String  | Title of the section. Will be displayed in a **<dt>** element.
|    **_title_**  |  String  | Content of the section. Will wrap all section's children in a **<dd>** element.

### Usage examples

#### 1. Accordion with static Section contents
```html
<my-accordion data-title="Accordion sample 1" data-animated="true" data-color="green">
    <my-fold data-title="Section 1" data-description="This is the static content of section 1."></my-fold>
    <my-fold data-title="Section 2">
        <p>This is an HTML content that will be added to the Section 2 definition description.</p>
    </my-fold>
    <my-fold data-title="Section 3" data-description="This content will be added after the 3 children shown below, and will be inside the dd element">
        <h2>Subtitle</h2>
        <p>This is an HTML content that will be added to the Section 3 definition description.</p>
        <p>...<p>
    </my-fold>
</my-accordion>
```

#### 2. Accordion with dynamic Section contents (ajax request)

```html
<my-accordion data-endpoint="/rest/api/accordion/data-1"></my-accordion>
```
This will work as long as call __GET /rest/api/accordion/data-1__ returns:
```js
{
    title: 'Accordion sample 1',
	color: 'green',
	animated: 'true',
	sections: [
	    {
			title: 'Section 1',
			content: 'This is the static content of section 1.'
		},
		{
			title: 'Section 2',
			content: '<p>This is an HTML content that will be added to the Section 2 definition description.</p>'
		}
	]
}
```
### Development

The following scripts are availble for development purposes (they must be executed from root app path):

Generate a full build (JS + CSS) in dist folder:
```sh
npm run build
```

Removes dist folder:
```sh
npm run clean
```

Validate eslint rules through all JS files:
```sh
npm run lint
```

Generate a full build (JS + CSS) and starts express server with webpack config and endpoint mocks:
```sh
npm run start
```

Generate only css styles (run sass compiler):
```sh
npm run styles
```

Run unit tests (TO BE DONE):
```sh
npm run test
```


   [ES6]: <http://www.ecma-international.org/ecma-262/6.0/index.html>
   [Sass]: <http://sass-lang.com/>
   [webpack]: <https://webpack.js.org/>
   [node.js]: <http://nodejs.org>
   [Express]: <http://expressjs.com>
   [ESLint]: <http://eslint.org/>
   [NPM]: <https://www.npmjs.com/>
   [babel]: <https://babeljs.io/>
