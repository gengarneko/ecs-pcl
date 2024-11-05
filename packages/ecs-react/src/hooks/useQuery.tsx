import {MutableRefObject, useEffect, useRef, useState} from 'react';

import {EntitySnapshot, QueryPredicate} from '@ecs-pcl/ecs';

import {Query} from '../lib/query';
import {QueryRef} from '../lib/query-ref';
import {useEngine} from './useEngine';

export type SnapshotHandler = (snapshot: EntitySnapshot) => void;
export type UseQueryOptions = {
  added?: SnapshotHandler;
  removed?: SnapshotHandler;
};

export function useQuery(predicate: QueryPredicate, options?: UseQueryOptions) {
  const engine = useEngine();
  const queryRef = useRef<Query>();
  const [updates, setUpdates] = useState(0);
  const update = () => setUpdates(updates + 1);

  useEffect(() => {
    if (queryRef.current === undefined) {
      const query = new Query(predicate);
      if (options?.added) {
        query.onEntityAdded.connect(options.added);
      }
      if (options?.removed) {
        query.onEntityRemoved.connect(options.removed);
      }
      query.onEntityAdded.connect(update);
      query.onEntityRemoved.connect(update);
      engine.addQuery(query);
      queryRef.current = query;
      update();
    }
  }, []);

  return new QueryRef(queryRef as MutableRefObject<Query>);
}
