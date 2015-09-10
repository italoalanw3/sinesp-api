exports.handler = function(event, context) {

	var requests = require('request');
	var crypto = require('crypto');
	var parseXML = require('xml2js').parseString;

	/** Verifica se o secret veio na requisição. Se não tiver
		vindo, utiliza o secret padrão */
	if (!event.hasOwnProperty('secret')) {
		var secret = 'shienshenlhq';
	} else {
		var secret = event.secret;
	}

	/** Verifica se a placa foi informada */
	if (event.hasOwnProperty('placa')) {
		var placa = event.placa;
	} else {
		context.fail('Placa não informada');
	}

	/** Criptografa a placa usando a chave do aplicativo */
	var token = crypto.createHmac('sha1', secret).update(placa).digest('hex');

	/** Cria o XML de chamada do serviço SOAP */
	var xml = '<?xml version="1.0" encoding="utf-8" standalone="yes" ?>'+
		'<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" '+
		'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" '+
		'xmlns:xsd="http://www.w3.org/2001/XMLSchema" >'+
		'<soap:Header>'+
		'<dispositivo>GT-S1312L</dispositivo>'+
		'<nomeSO>Android</nomeSO>'+
		'<versaoAplicativo>1.1.1</versaoAplicativo><versaoSO>4.1.4</versaoSO>'+
		'<aplicativo>aplicativo</aplicativo><ip>177.206.169.90</ip>'+
		'<token>'+token+'</token>'+
		'<latitude>-3.6770324</latitude><longitude>-38.6791411</longitude></soap:Header>'+
		'<soap:Body><webs:getStatus xmlns:webs="http://soap.ws.placa.service.sinesp.serpro.gov.br/">'+
		'<placa>'+placa+'</placa></webs:getStatus></soap:Body></soap:Envelope>';

	/** Montagem dos cabeçalhos da requisição */
	var headers = {
		"Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
		"Accept": "text/plain, */*; q=0.01",
		"Cache-Control": "no-cache",
		"Pragma": "no-cache",
		"x-wap-profile": "http://wap.samsungmobile.com/uaprof/GT-S7562.xml",
		"Content-length": xml.length,
		"User-Agent": "Mozilla/5.0 (Linux; U; Android 4.1.4; pt-br; GT-S1162L Build/IMM76I) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"
	};

	/** Tenta realizar a requisição */
	try {

		requests.post({
				headers: headers,
				url: 'http://sinespcidadao.sinesp.gov.br/sinesp-cidadao/ConsultaPlacaNovo27032014',
				body: xml
			}, function(error, response, body){
				/** Se não ocorrer nenhum erro */
				if (error===null) {
					/** Faz o parse do XML recebido */
					parseXML(body, function (err, result) {
    					resultado = result['soap:Envelope']['soap:Body'][0]['ns2:getStatusResponse'][0]['return'][0];
					});

					/** Retorna para o Lambda o resultado final */
					context.succeed(JSON.stringify(resultado));
				/** Retorna o erro que ocorreu na chamada (se houve) */
				} else {
					context.fail(error);
				}
			}
		);

	} catch (err) {
		/** Retorna erro se não conseguir fazer a requisição do SOAP por qualquer motivo */
		context.fail(err);
	}

};