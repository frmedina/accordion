'use strict';

class Fold extends HTMLElement {

	// Monitor the 'state' attribute for changes.
	static get observedAttributes() {
		return ['state'];
	}

	createdCallback() {
		// Using the dataset attributes of current component, we must build a new <dt> and <dd> elements and add them as current component's children.
		const {title, description} = this.dataset,
			dt = this.renderDefinitionTitle(title),
			dd = this.renderDefinitionDescription(description);

		// All HTML children defined inside our "my-fold" element, must be re-parented and appended into the generated <dd> element
		if (this.children && this.children.length > 0) {
			Object.keys(this.children).forEach(() => dd.appendChild(this.children.item(0)));
		}

		// Add definition title and definition description to current "fold" component
		this.appendChild(dt);
		this.appendChild(dd);

		// Update current section state (when recently created, will always be set to "inactive"
		this.toggleState();

		// Every time we click the definition title, the section state must be updated
		dt.addEventListener('click', this.toggleState.bind(this));

		// Add animation class if parent component is configured with --animated class
		if (this.parentElement && this.parentElement.classList.contains('Accordion--animated')) {
			dd.classList.add('is-animated');
		}
	}

	/**
	 * Create a new HTML Element.
	 * @param elementName string Name of the HTML Element to be created.
	 * @param elementClassNames array Array of CSS classes to apply to new HTML Element.
	 * @returns {Element}
	 */
	renderDOMElement(elementName, elementClassNames) {
		const element = document.createElement(elementName);
		if (Array.isArray(elementClassNames)) {
			elementClassNames.forEach((className) => element.classList.add(className));
		}
		return element;
	}

	/**
	 * Create a new definition-title <dt> element.
	 * @param title
	 * @returns {Element}
	 */
	renderDefinitionTitle(title) {
		const dt = this.renderDOMElement('dt', ['Accordion-fold-title']);
		if (title) {
			dt.innerHTML = title;
		}
		return dt;
	}

	/**
	 * Create a new definition description <dd> element.
	 * @param description
	 * @returns {Element}
	 */
	renderDefinitionDescription(description) {
		const dd = this.renderDOMElement('dd', ['Accordion-fold-description']);
		if (description) {
			dd.innerHTML = '<p class="Accordion-fold-description-text">' + description + '</p>';
		}
		return dd;
	}

	/**
	 * Change section state to indicate if content is expanded (data-state="active") or collapsed (data-state="inactive").
	 */
	toggleState() {
		const {state} = this.dataset;
		if (state === 'active' || !state) {
			// Change state from active to inactive
			this.setAttribute('data-state', 'inactive');
		} else if (state === 'inactive') {
			// First, all section siblings must be collapsed (all other <my-fold> elements must be set to inactive state)
			this.foldSiblings();
			// And now change state from inactive to active
			this.setAttribute('data-state', 'active');
		}
	}

	/**
	 * Loops through all <my-fold> siblings of current fold and change its data-state attribute to "inactive".
	 */
	foldSiblings() {
		const activeSiblings = this.parentNode.querySelectorAll('my-fold[data-state="active"]');
		if (activeSiblings && activeSiblings.length) {
			activeSiblings.forEach((node) => {
				node.setAttribute('data-state', 'inactive');
			});
		}
	}

	/**
	 * Every time when data-state attribute is modified, we must update the CSS classes of <dt> and <dd> to assure that
	 * only one section is expanded at the same time.
	 * @param changed
	 * @param oldValue
	 * @param newValue
	 */
	attributeChangedCallback(changed, oldValue, newValue) {
		const [dt, dd] = this.children;
		if (changed === 'data-state') {
			if (newValue === 'active') {
				if (!dt.classList.contains('is-active')) {
					dt.classList.add('is-active');
				}
				dd.classList.remove('is-folded');
				if (!dd.classList.contains('is-unfolded')) {
					dd.classList.add('is-unfolded');
				}
			} else {
				dt.classList.remove('is-active');
				dd.classList.remove('is-unfolded');
				if (!dd.classList.contains('is-folded')) {
					dd.classList.add('is-folded');
				}
			}
		}
	}
}

export default Fold;
