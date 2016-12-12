# SINESP API

API em nodejs para a consulta de placas de veículos na base de dados do SINESP.

**Módulo NPM: Este repositório foi disponibilizado como uma biblioteca para uso com npm. Por favor, acesse https://www.npmjs.com/package/sinesp-nodejs para visualizar.**

**Como funciona**

Faça uma chamada passando uma placa no formato AAAA1234 e a função faz a pesquisa no serviço SOAP do SINESP e retorna os dados do veículo.

Na resposta, estão incluídas as seguintes informações:
- situacao: Se o veículo possui algum tipo de restrição (roubo, furto, apreensão, etc)
- modelo: Modelo do veículo
- fabricante: Fabricante do veículo
- cor: Cor do veículo
- ano: Ano de fabricação do veículo
- anoModelo: Ano do modelo do veículo
- uf: UF onde a placa está registrada
- municipio: Cidade onde a placa está registrada
- chassi: Últimos 5 dígitos do chassi do veículo

O formato de retorno da API é em JSON. Exemplo:

```
{
  "codigoRetorno": "0",
  "mensagemRetorno": "Sem erros.",
  "codigoSituacao": "0",
  "situacao": "Sem restrição",
  "modelo": "FORD/ESCORT 1.8 XR3",
  "marca": "FORD/ESCORT 1.8 XR3",
  "cor": "CINZA",
  "ano": "1990",
  "anoModelo": "1990",
  "placa": "AAA0001",
  "data": "10/12/2016 às 14:49:22",
  "uf": "PR",
  "municipio": "CURITIBA",
  "chassi": "************49500"
}
```

**Como usar**

Para usar a API, execute o arquivo index.js: `nodejs index.js`

Com o servidor rodando, faça uma requisição no seu navegador: `http://localhost:8080/api/consultaPlaca?placa=AAA0001`. Se tudo der certo, você verá o resultado na da chamada na tela.


**Observação**

Antigamente este repositório servia uma função para rodar no ambiente Lambda da AWS com o mesmo propósito. O motivo de não utilizar mais é porque o servidor do SINESP barra requisições feitas de ambientes externos. Como atualmente o serviço Lambda não existe na região de São Paulo (sa-east-1), as requisições não funcionariam corretamente.
