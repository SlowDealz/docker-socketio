FROM node:17-alpine

ADD supervisord.conf /etc/supervisor/conf.d/supervisord.conf

COPY install.sh \
     app.mjs \
     /srv

WORKDIR /srv

RUN chmod +x /srv/install.sh && \
    /bin/sh /srv/install.sh

EXPOSE 8080

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]

