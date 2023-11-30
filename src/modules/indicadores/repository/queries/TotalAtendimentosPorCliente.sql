SELECT usuarioCliente.nome AS name
	  ,COUNT(atendimentos.id) AS value
FROM atendimentos
INNER JOIN clientes ON atendimentos.idCliente = clientes.id
INNER JOIN usuarios AS usuarioCliente ON clientes.idUsuario = usuarioCliente.id
GROUP BY usuarioCliente.nome