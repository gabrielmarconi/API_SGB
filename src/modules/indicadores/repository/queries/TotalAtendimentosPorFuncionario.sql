SELECT usuarioFuncionario.nome AS name
	  ,COUNT(atendimentos.id) AS value
FROM atendimentos
INNER JOIN funcionarios ON atendimentos.idFuncionario = funcionarios.id
INNER JOIN usuarios AS usuarioFuncionario ON funcionarios.idUsuario = usuarioFuncionario.id
GROUP BY usuarioFuncionario.nome