import 'reflect-metadata';
import getDecorators from 'inversify-inject-decorators';
import container from './Container';

// Create a lazyInject decorator from container with caching enabled
const { lazyInject } = getDecorators(container, true);
export default lazyInject;
