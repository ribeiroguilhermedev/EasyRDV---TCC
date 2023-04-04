import pyodbc

driver = 'SQL Server'
server = '35.198.11.196'
db = 'easyrdv'
tcon = 'no'
uname = 'easyrdv'
pword = 'uiliavidalgui'

try:
    cnxn = pyodbc.connect(driver=driver, host=server, database=db, user=uname, password=pword,trusted_connection=tcon)
    print("Conexão bem-sucedida!")
    
    # Executa uma consulta simples para verificar se a conexão está aberta
    cursor = cnxn.cursor()
    cursor.execute("SELECT @@version;")
    row = cursor.fetchone()
    print(f"A conexão está aberta. Versão do banco de dados: {row[0]}")
    
except Exception as e:
    print("Falha ao conectar ao banco de dados.")
    print(str(e))
