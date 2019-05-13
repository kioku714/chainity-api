# chainity-api

## Clone project
```zsh
$ git clone https://github.com/JAVACAFE-STUDY/chainity-api.git
```

## Run docker containers with docker-compose
```zsh
$ cd chainity-api
# daemon mode: docker-compose up -d
$ docker-compose up
```

## Check API working
```zsh
$ curl -i localhost:3000/v1/groups/1/login -d 'email=system' -d 'password=system'
```
```console
HTTP/1.1 200 OK
Vary: X-HTTP-Method-Override, Accept-Encoding
X-DNS-Prefetch-Control: off
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-Download-Options: noopen
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Access-Control-Allow-Origin: *
Content-Type: application/json; charset=utf-8
Content-Length: 288
ETag: W/"120-Ad9PEW4FGdTJfjavu+jEC0BSc1s"
Date: Mon, 13 May 2019 02:19:37 GMT
Connection: keep-alive

{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2Q4Y2Q0NzgyNzcwMDAwMjQ0MjgxODAiLCJhZGRyZXNzIjoiZjk0NjFmMzgxMDk5YTI1M2FlZTQxMDA4MDZhNTgzODVlMjgxZDRlZCIsImlhdCI6MTU1NzcxMzk3NywiZXhwIjoxNTU3ODAwMzc3fQ.iPnXvaL9VvOoxFfe-Ld9BLBsn3rncJJ86Rak2S_iZR8","email":"system","name":"system"
```


## Kill docker containers with docker-compose
```zsh
$ docker-compose kill
```

