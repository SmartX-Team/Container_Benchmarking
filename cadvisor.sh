#! /bin/sh

sudo docker run   --volume=/:/rootfs:ro   --volume=/var/run:/var/run:rw   --volume=/sys:/sys:ro   --volume=/var/lib/docker/:/var/lib/docker:ro   --publish=9090:8080   --detach=true   --link=influxsrv:influxsrv   --name=cadvisor   google/cadvisor:latest   -storage_driver=influxdb   -storage_driver_db=cadvisor   -storage_driver_host=influxsrv:8086
