import { createStore } from 'redux';
import reducer from './reducer';

const prepareStore = () => createStore(reducer);

export default prepareStore;
