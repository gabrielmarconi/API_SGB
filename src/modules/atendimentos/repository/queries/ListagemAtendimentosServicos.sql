DECLARE @idAtendimento INT

SET @idAtendimento = :idAtendimento

SELECT atendimentosServicos.*
	  ,servicos.descricao
	  ,servicos.duracao
	  ,servicos.valor
FROM atendimentosServicos
INNER JOIN servicos ON atendimentosServicos.idServico = servicos.id
WHERE (atendimentosServicos.idAtendimento = @idAtendimento)