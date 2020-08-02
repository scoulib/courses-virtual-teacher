import { Resource } from '../resource.model';

export class Element extends Resource {
    public profondeur: number;
    public position: number;
    public title: string;
    public description: string;
    public expanded: boolean;
    public selected: boolean;
    public hasChildren: boolean;
}
