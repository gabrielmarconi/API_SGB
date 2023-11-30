SELECT 'Total Atendimentos no Mês' AS name
	  ,COUNT(atendimentos.id) AS value
FROM atendimentos
WHERE DATEPART(MONTH,atendimentos.dataHora) = DATEPART(MONTH,GETDATE())