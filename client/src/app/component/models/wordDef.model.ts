import { IWordDefExample } from './wordDefExample.model';

export class IWordDef {
    word: string;
    noun?: IWordDefExample;
    adjective?: IWordDefExample;
    verb?: IWordDefExample;
}