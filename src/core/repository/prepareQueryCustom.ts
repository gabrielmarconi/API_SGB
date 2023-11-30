/* !!!!!!!!!!!  ATENÇÃO  !!!!!!!!!!!

    - O retorno da consulta sempre será um array;
    - Os parametros que estao dentro da clausula IN passar como um array. Exemplo
     
     const parametros = {
         CodigoEmpresa: 1,
         Nome: 'Exemplo'
         DataInicio: '2021-11-11 15:14:00.000,
         Situacoes: ['Teste', 'Dev'],
         Ajustes: [2, 3]
     }

    - Os parametros do tipo data deve vir como string no formato 'YYYY-MM-DD HH:mm:ss.000'
    - Os parametros devem vir no formato de uma objeto. Exemplo:

     const parametros = {
         CodigoEmpresa: 1,
         Nome: 'Exemplo'
         DataInicio: '2021-11-11 15:14:00.000'
     }
*/


export interface ParametersCustomQuery {
    name: string,
    type?: string,
    value: any
}

export class PrepareQueryCustom {
    constructor(
        private query: string,
        private queryParameters?: any
    ) {
        this.queryParameters = this.prepareParameters(this.queryParameters)
    }

    async prepare() {

        let result;
        // variavel utilizada para montar a query que sera executada
        let consulta: Array<string> = []
        // variavel para ajudar na montagem da query que sera executada
        let queryAux: Array<string> = []
        // quebra a query informada pelas quebras de linha para ser inserida no array de query formatada
        queryAux = this.query.split('\n')
        // percorre a query aux validando os dados para ser consultada
        for (let i in queryAux) {
            // remove os espacos em branco
            queryAux[i] = queryAux[i].trim()

            // verifica se foram informados os parametros
            if (this.queryParameters && this.queryParameters.length > 0) {
                // verifica se existe o parametro na linha pelo caracter(:)
                let qtdeParametros = this.quantidadeOcorrenciaString(queryAux[i], ':')
                if (qtdeParametros > 0) {
                    for (let o = 0; o < qtdeParametros; o++) {
                        let parametroNomeado = queryAux[i].replace(/\r/g, '').replace(/[\[\].!'@,><|%//\\;&*()_+=-]/g, '')
                        parametroNomeado = parametroNomeado.substr(parametroNomeado.indexOf(':'), parametroNomeado.length)
                        parametroNomeado = parametroNomeado.substr(0, parametroNomeado.indexOf(' ') != -1 ? parametroNomeado.indexOf(' ') : parametroNomeado.indexOf(')') != -1 ? parametroNomeado.indexOf(')') : parametroNomeado.length)
                        // verifica o parametros existente no array de parametros da query
                        const parametroQuery = (this.queryParameters as Array<any>).find(element => element.name == parametroNomeado.replace(':', ''))
                        if (parametroQuery) {
                            // realiza a substituicao dos parametros
                            // verifica o tipo de parametro para formatar o valor do parametro corretamente
                            switch (parametroQuery.type) {
                                case 'number':
                                    queryAux[i] = queryAux[i].replace(':' + parametroQuery.name, parametroQuery.value)
                                    break;
                                case 'string':
                                    // remover caracters especiais do valor do parametro 
                                    queryAux[i] = queryAux[i].replace(':' + parametroQuery.name, String.fromCharCode(39) + this.validateSQLInjection(parametroQuery.value) + String.fromCharCode(39))
                                    break;
                                case 'boolean':
                                    queryAux[i] = queryAux[i].replace(':' + parametroQuery.name, parametroQuery.value == true || parametroQuery.value == 'true' ? '1' : '0')
                                    break;
                                case 'array':
                                    let valorAjustado = String.fromCharCode(39) + parametroQuery.value.join(String.fromCharCode(39) + ',' + String.fromCharCode(39)) + String.fromCharCode(39)
                                    queryAux[i] = queryAux[i].replace(':' + parametroQuery.name, valorAjustado)
                                    break;
                                default:
                                    queryAux[i] = queryAux[i].replace(':' + parametroQuery.name, String.fromCharCode(39) + this.validateSQLInjection(parametroQuery.value) + String.fromCharCode(39))
                            }
                        }
                    }
                }
            }

            // adiciona a linha na query a ser consultada
            consulta.push(queryAux[i])
        }

        // retorna a query com os parametros substituidos
        return consulta.join(' ') //getConnection().transaction('READ UNCOMMITTED', async transactionalEntityManager => await transactionalEntityManager.query(consulta.join(' ')))
    }

    private prepareParameters(params: any): any {
        const parametros: Array<ParametersCustomQuery> = []
        for (let field in params) {
            let parametro: ParametersCustomQuery = {
                name: field,
                type: Array.isArray(params[field]) ? 'array' : typeof params[field],
                value: params[field]
            }
            parametros.push(parametro)
        }
        return parametros
    }

    private quantidadeOcorrenciaString(texto: string, ocorrencia: string): number {
        let retorno = 0
        for (let i = 0; i < texto.length; i++) {
            if (texto[i] == ocorrencia)
                retorno++
        }
        return retorno
    }

    private validateSQLInjection(texto: string): string {
        // Referencia http://www.symantec.com/connect/articles/detection-sql-injection-and-cross-site-scripting-attacks
        const sql_meta = new RegExp('(%27)|(\')|(--)|(%23)|(#)', 'i');
        if (sql_meta.test(texto)) {
            return '';
        }

        const sql_meta2 = new RegExp('((%3D)|(=))[^\n]*((%27)|(\')|(--)|(%3B)|(;))', 'i');
        if (sql_meta2.test(texto)) {
            return '';
        }

        const sql_typical = new RegExp('w*((%27)|(\'))((%6F)|o|(%4F))((%72)|r|(%52))', 'i');
        if (sql_typical.test(texto)) {
            return '';
        }

        const sql_union = new RegExp('((%27)|(\'))union', 'i');
        if (sql_union.test(texto)) {
            return '';
        }

        return texto;
    }
}