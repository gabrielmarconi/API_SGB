SELECT 'Total Abertos' AS name
	  ,COUNT(atendimentos.id) AS value
FROM atendimentos
WHERE atendimentos.confirmado = 'N'