SELECT clientes.id
	  ,clientes.idUsuario
	  ,usuarios.nome
	  ,usuarios.senha
	  ,usuarios.telefone
	  ,usuarios.email
	  ,usuarios.dataNascimento	  
	  ,usuarios.dataAlteracaoSenha
FROM clientes
INNER JOIN usuarios ON clientes.idUsuario = usuarios.id
WHERE ((:todosClientes <> 1) OR (clientes.idUsuario = :idUsuario))
ORDER BY usuarios.nome