SELECT atendimentos.*	  
	  ,usuarioCliente.nome AS cliente
	  ,usuarioFuncionario.nome AS funcionario
	  ,formasPagamento.descricao AS formaPagamento	  
FROM atendimentos
INNER JOIN clientes ON atendimentos.idCliente = clientes.id
INNER JOIN usuarios AS usuarioCliente ON clientes.idUsuario = usuarioCliente.id
INNER JOIN funcionarios ON atendimentos.idFuncionario = funcionarios.id
INNER JOIN usuarios AS usuarioFuncionario ON funcionarios.idUsuario = usuarioFuncionario.id
INNER JOIN formasPagamento ON atendimentos.idFormaPagamento = formasPagamento.id
WHERE ((:todosAtendimentos <> 1) OR (atendimentos.idCliente = :idCliente))