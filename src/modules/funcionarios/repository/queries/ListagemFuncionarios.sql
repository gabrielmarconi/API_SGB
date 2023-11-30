SELECT funcionarios.id
	  ,funcionarios.idUsuario	  
	  ,usuarios.nome
	  ,usuarios.senha
	  ,usuarios.telefone
	  ,usuarios.email
	  ,usuarios.dataNascimento
	  ,usuarios.administrador		
	  ,usuarios.dataAlteracaoSenha
	  ,usuarios.SMTPHost
	  ,usuarios.SMTPPort
	  ,usuarios.SMTPRemetente
	  ,usuarios.SMTPSenha
	  ,usuarios.SMTPTimeout
	  ,usuarios.SMTPUsuario
	  ,usuarios.SMTPConexaoSegura
	  ,usuarios.horaInicioExpediente
	  ,usuarios.horaTerminoExpediente
FROM funcionarios
INNER JOIN usuarios ON funcionarios.idUsuario = usuarios.id
ORDER BY usuarios.nome