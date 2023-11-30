import { Column, Entity } from "typeorm"

export class IndicadorEntity {

    public Modulo: number    
    public Detalhes: string        
    public Total: number    
    public Indicador: string

    constructor(props?: Partial<IndicadorEntity>) {
        Object.assign(this, props)
    }
}