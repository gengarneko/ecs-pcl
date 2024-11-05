import {Component, ContextType} from 'react';

import {configure, makeObservable, observable} from 'mobx';

import {EntityContext} from '../hooks/useEntity';
import {NonFunctionProperties} from '../lib/utils';

configure({
  enforceActions: 'never',
});

const filteredProps = ['props', 'context', 'refs', 'updater', 'meta'];

export class Facet<T extends {}> extends Component<
  NonFunctionProperties<Omit<T, 'meta'>>
> {
  static override contextType = EntityContext;
  override context!: ContextType<typeof EntityContext>;

  createFake() {
    const ctor = Object.getPrototypeOf(this).constructor;
    return new ctor();
  }

  getAnnotations(fake: unknown) {
    const entries = new Map(
      Object.getOwnPropertyNames(fake)
        .filter((k) => !filteredProps.includes(k) && !k.endsWith('Ref'))
        .map((k) => [k, observable]),
    ).entries();
    return Object.fromEntries(entries) as any;
  }

  asComponent() {
    return this as NonNullable<Facet<T>>;
  }

  override componentDidMount() {
    if (this.context) {
      Object.assign(this, this.props);
      const fake = this.createFake();
      const annotations = this.getAnnotations(fake);
      makeObservable(this, annotations, {
        autoBind: true,
      });
      this.context.add(this as any);
    } else {
      console.error(`Data Component without Entity Context!`);
    }
  }

  override render() {
    Object.assign(this, this.props);
    return null;
  }
}
