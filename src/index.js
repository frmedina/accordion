import Accordion from './components/accordion/js/Accordion';
import Fold from './components/accordion/js/Fold';
import styles from './components/accordion/styles/index.scss';

document.registerElement('my-accordion', Accordion);
document.registerElement('my-fold', Fold);

if (styles) {
	console.log('Styles loaded!');
}
