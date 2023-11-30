SELECT usuarios.id
	  ,usuarios.Senha	  
	  ,usuarios.Email
FROM Usuarios WITH (NOLOCK)
WHERE usuarios.email = :email