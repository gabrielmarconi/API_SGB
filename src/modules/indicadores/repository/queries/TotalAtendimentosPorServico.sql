SELECT servicos.descricao AS name
	  ,COUNT(atendimentosServicos.idServico) AS value
FROM atendimentos
INNER JOIN atendimentosServicos ON atendimentos.id = atendimentosServicos.idAtendimento
INNER JOIN servicos ON atendimentosServicos.idServico = servicos.id
GROUP BY servicos.descricao