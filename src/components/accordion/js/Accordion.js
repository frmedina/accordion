'use strict';

import availableThemes from './enums/availableThemesEnum';
import availableAnimated from './enums/availableAnimatedEnum';

import ajax from './utils/ajax';

class Accordion extends HTMLElement {

	createdCallback() {
		const {color, animated, title, endpoint} = this.dataset,
			colorClass = this.getTheme(color),
			animatedClass = this.getIsAnimated(animated),
			titleElement = this.renderTitle(title);

		if (endpoint) {
			// When data-endpoint is defined in HTML Element, we must call ajax GET method to retrieve data from target endpoint
			this.retrieveData(endpoint);
		} else {
			// When only static attributes are defined, we create the content of accordion component in <dl> element
			this.renderAccordionView(titleElement, `Accordion ${colorClass} ${animatedClass}`);
		}
	}

	/**
	 * Retrieve the CSS classname to apply a color theme.
	 * @param dataColor string Value of data-color attribute.
	 * @returns {string}
	 */
	getTheme(dataColor) {
		let theme = '';
		// Validate that a color is set and is one of the available CSS accordion's themes
		if (dataColor && Object.keys(availableThemes).includes(dataColor)) {
			theme = availableThemes[dataColor];
		}
		return theme;
	}

	/**
	 * Check if CSS transform must be applied to animate the section's expand/collapse changes.
	 * @param dataAnimated string Value of data-animated attribute.
	 * @returns {string}
	 */
	getIsAnimated(dataAnimated) {
		let animated = '';
		// Validate that animated is set and is one of the available CSS animations on/off possible values
		if (dataAnimated && Object.keys(availableAnimated).includes(dataAnimated)) {
			animated = availableAnimated[dataAnimated];
		}
		return animated;
	}

	/**
	 * Create an H3 element with the title of the section.
	 * @param dataTitle string Title of section.
	 * @returns {string}
	 */
	renderTitle(dataTitle) {
		let title = '';
		if (dataTitle) {
			title =`<h3>${dataTitle}</h3>`;
		}
		return title;
	}

	/**
	 * Perform Ajax GET call to retrieve data from target endpoint URL.
	 * @param endpointUrl string API REST endpoint URL.
	 */
	retrieveData(endpointUrl) {
		ajax.get(endpointUrl)
			.then(JSON.parse, this.processError.bind(this))
			.then(this.processData.bind(this))
			.catch(this.processError.bind(this));
	}

	/**
	 * Create HTML of current <my-accordion> element. Must contain the <dl> element (wrapper parent of accordion component).
	 * @param title string Title of section.
	 * @param cssClasses string CSS classnames to apply to <dl> element.
	 */
	renderAccordionView(title, cssClasses) {
		this.innerHTML = `
			${title}
			<dl class="${cssClasses}">
				${this.innerHTML}
			</dl>`;
	}

	/**
	 * Use data retrieved from API REST endpoint to build dynamically the children folds (sections) of current accordion component.
	 * @param data Object JSON response from API REST endpoint.
	 */
	processData(data) {
		let dl, folds = [],
			titleElement,
			colorClass, animatedClass;

		if (data && Array.isArray(data.sections)) {
			// Extract title, color and animated attributes from response to build <dl> element in the same way of "static" sections case.
			titleElement = this.renderTitle(data.title);
			colorClass = this.getTheme(data.color);
			animatedClass = this.getIsAnimated(data.animated);
			this.renderAccordionView(titleElement, `Accordion ${colorClass} ${animatedClass}`);

			dl = this.children.item(this.children.length - 1);
			// For each section found in response.sections, add a new <my-fold> element
			data.sections.forEach((section) => folds.push(`<my-fold data-title="${section.title}" data-description="${section.content}"></my-fold>`));
			dl.innerHTML += folds.join('');
		}
	}

	/**
	 * Handle error case when endpoint is not available, and creates a friendly error message.
	 * @param error xhr Ajax call error.
	 */
	processError(error) {
		console.log('Accordion ajax content load failed!', error);
		const {title} = this.dataset,
			titleElement = this.renderTitle(title),
			errorMessage = this.renderDynamicContentFailedMessage();
		this.innerHTML = titleElement + errorMessage;
	}

	/**
	 * Create an error message node to show as content of the accordion's failed endpoint call.
	 * @returns {string}
	 */
	renderDynamicContentFailedMessage() {
		const {endpoint} = this.dataset;
		return `<p class="Accordion-fold error">ERROR: Cannot retrieve data from endpoint <strong>${endpoint}</strong></p>`;
	}

}

export default Accordion;
