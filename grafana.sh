#! /bin/sh

sudo docker run -d -p 3000:3000   -e HTTP_USER=admin   -e HTTP_PASS=admin   -e INFLUXDB_HOST=influxsrv   -e INFLUXDB_PORT=8086   -e INFLUXDB_NAME=cadvisor   -e INFLUXDB_USER=root   -e INFLUXDB_PASS=root   --link=influxsrv:influxsrv   --name grafana   grafana/grafana:2.0.2
