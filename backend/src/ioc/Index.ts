import bindContainer from './ContainerBindings';

export default function setUpIoC(): void {
  // We need to split the binding of the container from its instantiation
  // to avoid circular dependencies with lazyInject.
  // bindContainer uses Container.ts, so the container is created there.
  // After that, the dependencies are registered in ContainerBindings.ts
  // and finally, the lazyInject decorator is created in LazyInject.ts
  bindContainer();
}
