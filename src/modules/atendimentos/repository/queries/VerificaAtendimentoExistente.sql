SET DATEFORMAT ymd

DECLARE @DataInicio DATETIME, 
	    @DataTermino DATETIME

SET @DataInicio = :dataInicio
SET @DataTermino = :dataTermino

SELECT atendimentos.id
	  ,atendimentos.idFuncionario
	  ,atendimentos.dataHora
	  ,atendimentos.dataHoraTermino
FROM atendimentos
LEFT JOIN funcionarios ON atendimentos.idFuncionario = funcionarios.id
LEFT JOIN usuarios ON funcionarios.idUsuario = usuarios.id
WHERE atendimentos.idFuncionario = :idFuncionario
  AND ((:todosAtendimentos <> 1) OR (atendimentos.id <> :idAtendimento))
  AND atendimentos.dataHora >= (CONVERT(DATETIME,REPLACE(CONVERT(VARCHAR, @DataInicio,102) + ' ', '.', '-') + ' ' + STUFF(usuarios.horaInicioExpediente, 3, 0, ':')))
  AND atendimentos.dataHoraTermino <= (CONVERT(DATETIME,REPLACE(CONVERT(VARCHAR, @DataTermino,102) + ' ', '.', '-') + ' ' + STUFF(usuarios.horaTerminoExpediente, 3, 0, ':')))  
  AND ((atendimentos.dataHora < @DataInicio AND atendimentos.dataHoraTermino > @DataInicio) 
	OR (atendimentos.dataHora > @DataInicio AND atendimentos.dataHoraTermino < @DataTermino)	
	OR (atendimentos.dataHora = @DataInicio AND atendimentos.dataHoraTermino = @DataTermino)
	OR (atendimentos.dataHora = @DataInicio AND atendimentos.dataHoraTermino < @DataTermino)
	OR (atendimentos.dataHora > @DataInicio AND atendimentos.dataHoraTermino = @DataTermino))
