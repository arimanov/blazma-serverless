# Blazma

Mobile chat application

## Application backend
### Common scheme:
![image info](./img/sheme.png)

### API
`GET` `/v1/status` - get server status

<br/>

`GET` `/v1/messages` - get last messages list, if `after` is empty backend returns the number of messages specified in the constant `RESPONSE_MAX_MESSAGES`
```
?after=<messageId>
```

<br/>

`POST` `/v1/messages` - send new message
```json
{"message": "","token": ""}
```

<br/>

`POST` `/v1/signin` - login to system
```json
{"name": ""}
```

<br/>

`POST` `/v1/signout` - logout user
```json
{"name": "","token": ""}
```

### Environment variables
`SA_JSON_FILE`
`DB_NAME`
`ENTRY_POINT`

### API Gateway Scheme
```yaml
openapi: 3.0.0
info:
  title: Chat API
  version: 1.0.0
servers:
- url: https://<...>.apigw.yandexcloud.net
paths:
  /v1/status:
    get:
      x-yc-apigateway-integration:
        type: cloud-functions
        function_id: <...>
        service_account_id: <...>
  /v1/signin:
    post:
      x-yc-apigateway-integration:
        type: cloud-functions
        function_id: <...>
        service_account_id: <...>
  /v1/signout:
    post:
      x-yc-apigateway-integration:
        type: cloud-functions
        function_id: <...>
        service_account_id: <...>
  /v1/messages:
    get:
      x-yc-apigateway-integration:
        type: cloud-functions
        function_id: <...>
        service_account_id: <...>
    post:
      x-yc-apigateway-integration:
        type: cloud-functions
        function_id: <...>
        service_account_id: <...>
```
