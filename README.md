# PoC - Integration Test

### Propósito
Este escenario esta pensando para poder hacer convivir tanto los test de postman como los chackram.

### Estructura del repo

> **postman/test/:** contiene las colecciones de Postman exportadas en archivos .json



 ` Ejecutor que usaremos principalmente es newman.`

> **chakram/test/:** contiene los diferentes test (por tipico)


### Pasos para agregar un test
La primera vez...
0) Instalar Nodejs con su manejador de paquetes ($sudo apt-get update; sudo apt-get install nodejs; sudo apt-get install npm ), newman (sudo npm install -g newman)

1) Clonarse este repositorio

Si ya hiciste alguna vez los pasos anteriores...
1) Actualizá el repositorio

-Para postman:

3) Abrir Postman e importar la colección a modificar de la carpeta *postman/test*
4) Crear el caso de test y probarlo.
5) Exportar la colección con el mismo nombre que se importó.
8) Subir los cambios al repositorio

-Para chackram:


### Posibles problemas

------------------------------------------------------
[newman]: <https://www.getpostman.com/docs/v6/postman/collection_runs/command_line_integration_with_newman>
[Postman]: <https://www.getpostman.com/docs/v6/>
