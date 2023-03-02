import {BaseModel} from './utils/BaseModel';
import {JSONSerializableKeys} from './utils/JSONSerializable';
import {ID} from './utils/UtilityTypes';

export class Category extends BaseModel<Category> {
    public readonly name: string;
    public readonly color?: string;

    public constructor({ id, name, color } : { id: ID, name: string, color?: string }) {
        super({ id });
        this.name = name;
        this.color = color;
    }

    public toJSON(): JSONSerializableKeys<Category> {
        return {
            id: this.id,
            name: this.name,
            color: this.color
        };
    }
}
