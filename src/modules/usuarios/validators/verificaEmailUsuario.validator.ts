import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UsuarioRepository } from "../repository/usuarios.repository";

@Injectable()
@ValidatorConstraint()
export class EmailUnicoUsuarioConstraint implements ValidatorConstraintInterface {

    constructor(
        private usuarioRepository: UsuarioRepository
    ) {}

    async validate(email: string, validationArguments?: ValidationArguments): Promise<boolean> {
        const usuarioExistente = await this.usuarioRepository.get().find({
            where: { 'email': email }
        })
        if (usuarioExistente.length > 0) {
            const usuario = usuarioExistente[0]            
            if (validationArguments.object.hasOwnProperty('idUsuario')) {
                if (usuario.id === validationArguments.object['idUsuario'])
                    return true
            }
        }
        return usuarioExistente.length <= 0 ? true : false
    }
}

export function IsEmailExistenteUsuario(validationOptions: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: EmailUnicoUsuarioConstraint,
        });
    };
}