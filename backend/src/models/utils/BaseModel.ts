import {JSONSerializable, JSONSerializableKeys} from './JSONSerializable';
import {ID} from './UtilityTypes';

export abstract class BaseModel<T = {}> implements JSONSerializable<T> {
    public readonly id: ID;

    protected constructor({id}: {id: ID}) {
        this.id = id
    }

    abstract toJSON(): JSONSerializableKeys<T>;
}
