import * as argon2 from "argon2";
import { IMensagemEmail, ITransporterEmail } from "src/infra/providers/NodemailerProvider/IEmailProvider";
import { UsuarioRepository } from "../repository/usuarios.repository";
import { EnviarEmailEsqueciSenhaDTO } from "../dto/enviarEmailEsqueciSenha.dto";
import descriptografar from "src/shared/descriptografar";
import dataAjustada from "src/shared/rotinas";
import { FuncionarioRepository } from "src/modules/funcionarios/repository/funcionarios.repository";
import { Injectable } from "@nestjs/common";
import { EmailProvider } from "src/infra/providers/NodemailerProvider/implementations/EmailProvider";
import { throwNotFoundError } from "src/common/errors";
import { USUARIO_CONSTANTS } from "../constants/usuarios.constants";

@Injectable()
export class EnviarEmailEsqueciSenhaService {
    constructor(
        private emailProvider: EmailProvider,
        private usuarioRepository: UsuarioRepository,
        private funcionarioRepository: FuncionarioRepository        
    ) {}

    async execute(data: EnviarEmailEsqueciSenhaDTO): Promise<void> {    

        const usuario = await this.usuarioRepository.get().findOne({
            where:{'id': data.idUsuario}
        })   
        if (usuario){
            // Valida se o e-mail do usuário corresponde ao e-mail de confirmação
            if (data.emailConfirmacao == usuario.email) {                        
                // localiza funcionario administrador para capturar informações de envio de e-mail
                const usuariosAdministradores = await this.usuarioRepository.get().find({
                    where: { 'administrador': 'S' }
                })
                if (usuariosAdministradores.length > 0){
                    for (let funcionario of usuariosAdministradores) {                        
                        const funcionarioAdministrador = await this.funcionarioRepository.get().findOne({
                            where: { 'idUsuario': funcionario.id }
                        })
                        if (funcionarioAdministrador) {                            
                            if (funcionario.SMTPHost && funcionario.SMTPPort && funcionario.SMTPUsuario && funcionario.SMTPSenha && funcionario.SMTPTimeout) {
                                const transporter: ITransporterEmail = {
                                    host: funcionario.SMTPHost,
                                    port: funcionario.SMTPPort,
                                    secure: funcionario.SMTPConexaoSegura == 'S',
                                    connectionTimeout: funcionario.SMTPTimeout,
                                    auth: {
                                        user: funcionario.SMTPUsuario,
                                        pass: descriptografar(funcionario.SMTPSenha)//nhce qluw lnhc ywyg
                                    },
                                    from: {
                                        address: funcionario.SMTPRemetente ? funcionario.SMTPRemetente : funcionario.SMTPUsuario,
                                        name: funcionario.nome
                                    }
                                }                                
                                // Declara a variável que ira receber a senha provisória
                                let senhaProvisoria = Math.random().toString(36).slice(-6)
            
                                const email: IMensagemEmail = {
                                    para: {
                                        address: data.emailConfirmacao,
                                        name: usuario.nome
                                    },
                                    assunto: 'Email de Recuperação de Senha - SGB',
                                    html: `<p>Segue sua senha provisória para acesso ao sistema</p>
                                        <p><strong>${senhaProvisoria}</strong></p>
                                        <p>Att,</p>
                                        <p>SGB</p>`,
                                    anexos: []
                                }
            
                                await this.emailProvider.enviarEmail(email, transporter)
            
                                // Atualiza a senha do usuário para a provisória
                                usuario.senha = await argon2.hash(senhaProvisoria);
                                usuario.senhaProvisoria = 'S'
                                usuario.dataAlteracaoSenha = dataAjustada(true)
                                await this.usuarioRepository.update('id', usuario)
            
                            } else {
                                throwNotFoundError(USUARIO_CONSTANTS.SMTP_NAO_CONFIGURADO)
                            }
                        }
                    }                    
                }        
                                
            } else {
                throwNotFoundError(USUARIO_CONSTANTS.EMAIL_NAO_COINCIDEM)
            }
        }        

    }
}