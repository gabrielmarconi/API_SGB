import { Repository } from "typeorm";
import { throwNotFoundError } from "../../common/errors";
import { IParametersRequest } from "../interfaces/IParametersRequest.interface";

export class BaseRepository<T> {

    constructor(
        private repository: Repository<T>
    ) {}

    async save(data: T) {
        // captura o nome da entidade
        let nameEntity = this.repository.metadata.name
        // captura as colunas da entidade
        let colunsEntity = this.repository.metadata.columns.map(column => column.propertyName)
         
        return await this.repository.save(data)
    }

    async update(chave: string, data: T) {
        const id = data[chave]
        let clausulaWhere = {}
        clausulaWhere[chave] = id
        const updated = await this.repository.findOne({
            where: clausulaWhere
        })
        if (!updated)
            throwNotFoundError()

        // captura o nome da entidade
        let nameEntity = this.repository.metadata.name
        // captura as colunas da entidade
        let colunsEntity = this.repository.metadata.columns.map(column => column.propertyName)
        
        return await this.repository.save({ id, ...data })
    }

    async delete(chave: string, data: T) {
        const id = data[chave]
        const retorno = await this.repository.delete(id)
        if (retorno.affected)
            return retorno.affected > 0 ? true : false
        else
            return false
    }

    async executeQuery(query: string) {
        try {
            let retorno = await this.repository.query(query)
            return retorno
        } catch (err) {
            console.log(err)
            return []
        }
    }

    get() {
        return this.repository
    }
}